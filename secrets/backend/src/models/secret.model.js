import { Schema, model } from "mongoose";

const SecretSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

SecretSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Secret = model('Secret', SecretSchema);
export default Secret;