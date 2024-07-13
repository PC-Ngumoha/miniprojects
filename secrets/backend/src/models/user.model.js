import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  otherNames: String,
  username: {
    type: String,
    trim: true,
    required: true,
  },
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
  updatedAt: Date,
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = model('User', UserSchema);
export default User;