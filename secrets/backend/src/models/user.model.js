import { createHmac } from 'node:crypto';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

UserSchema.statics.canRefresh = async function (token) {
  if (!token) throw new Error('Unauthorized!!!');
  const secret = 'thisisnotthesecretkeyshouldbereplacedinproduction';

  const { id } = jwt.verify(token, secret);

  const user = await User.findById(id);

  if (!user) throw new Error('User not found');

  const tokenHash = createHmac('sha256', secret).update(token).digest('hex');

  const match = user.tokens.find((elem) => elem.token === tokenHash);
  if (!match) throw new Error('Invalid token');

  user.tokens = user.tokens.filter((elem) => elem.token !== tokenHash);
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
    'thisisnotthesecretkeyshouldbereplacedinproduction',
    {
      expiresIn: '10m',
    }
  );

  return token;
};

UserSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const secret = 'thisisnotthesecretkeyshouldbereplacedinproduction';

  const token = jwt.sign(
    {
      id: user._id,
    },
    secret,
    {
      expiresIn: '1d',
    }
  );

  const rTknHash = createHmac('sha256', secret).update(token).digest('hex');
  user.tokens.push({ token: rTknHash });

  await user.save();
  return token;
};

const User = model('User', UserSchema);
export default User;
