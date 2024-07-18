import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

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

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('Incorrect password');
  }

  return user;
}

const User = model('User', UserSchema);
export default User;