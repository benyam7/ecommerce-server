const { model, Schema } = require('mongoose');

const itemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  photoUrl: String,
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: String,
});

module.exports = model('Item', itemSchema);
