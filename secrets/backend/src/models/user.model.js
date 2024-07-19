import { createHmac } from 'node:crypto';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  expiry: process.env.ACCESS_TOKEN_LIFESPAN,
};

const REFRESH_TOKEN = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiry: process.env.REFRESH_TOKEN_LIFESPAN,
};

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  otherNames: String,
  password: {
    type: String,
    minlength: [8, 'Password cannot be less than 8 chars long'],
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.tokens;
    return ret;
  },
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  this.updatedAt = Date.now();
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update.password) {
    update.password = bcrypt.hashSync(update.password, bcrypt.genSaltSync(10));
  }

  update.updatedAt = Date.now();
  this.setUpdate(update);

  next();
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('Incorrect password');
  }

  return user;
};

UserSchema.statics.hydrateFromRefreshToken = async function (token) {
  if (!token) throw new Error('Unauthorized!!!');

  const { id } = jwt.verify(token, REFRESH_TOKEN.secret);

  const user = await User.findById(id);

  if (!user) throw new Error('User not found');

  const tknHash = createHmac('sha256', REFRESH_TOKEN.secret)
    .update(token)
    .digest('hex');

  const match = user.tokens.find((elem) => elem.token === tknHash);
  if (!match) throw new Error('Invalid token');

  user.tokens = user.tokens.filter((elem) => elem.token !== tknHash);
  await user.save();

  return user;
};

UserSchema.methods.generateAccessToken = async function () {
  const user = this;

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    ACCESS_TOKEN.secret,
    {
      expiresIn: ACCESS_TOKEN.expiry,
    }
  );

  return token;
};

UserSchema.methods.generateRefreshToken = async function () {
  const user = this;

  const token = jwt.sign(
    {
      id: user._id,
    },
    REFRESH_TOKEN.secret,
    {
      expiresIn: REFRESH_TOKEN.expiry,
    }
  );

  const rTknHash = createHmac('sha256', REFRESH_TOKEN.secret)
    .update(token)
    .digest('hex');
  user.tokens.push({ token: rTknHash });

  await user.save();
  return token;
};

const User = model('User', UserSchema);
export default User;
