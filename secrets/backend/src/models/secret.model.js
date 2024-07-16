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
  updatedAt: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

SecretSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// SecretSchema.statics.updateAuthorSecret = async function (id, authorId, data) {
//   const secret = await this.findOne({ _id: id, author: authorId });

// };

const Secret = model('Secret', SecretSchema);
export default Secret;