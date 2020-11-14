const { model, Schema } = require('mongoose');

const cartSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      quantity: { type: Number },
    },
  ],
});

module.exports = model('Cart', cartSchema);
