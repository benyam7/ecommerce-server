const { combineResolvers } = require('graphql-resolvers');

const { isAuthenitcated } = require('./authorization.js');

module.exports = {
  Mutation: {
    addItemsToCart: combineResolvers(
      isAuthenitcated,
      async (_, { items }, { models: { Cart }, currentUser }) => {
        try {
          const cart = new Cart({
            buyer: currentUser.id,
            items,
          });

          await cart.save();
          return {
            __typename: 'CartAdditionSuccess',
            message: 'Cart items added successfully',
          };
        } catch (e) {
          console.log(e);
          return {
            __typename: 'AddItemsToCartError',
            message: 'Unable to add items to cart please try again',
            type: `${e}`,
          };
        }
      },
    ),

    removeItemFromCart: combineResolvers(
      // isAuthenitcated,
      async (
        _,
        { itemId },
        { models: { Cart, Item }, currentUser },
      ) => {
        try {
          // find cart by user id this also makesure current user is owner of the cart
          const cart = await Cart.findOne({
            buyer: '5faef465fdd5dd361cc7cc30',
          });

          console.log(cart, 'cart to updated');
          // return if cart doesn't exist
          if (!cart) {
            return "cart dosen't exist";
          }
          // get the item to be removed by itemId
          const itemIndex = cart.items.findIndex(
            (element) => element.item.toString() === itemId,
          );
          // return if item not exists
          if (itemIndex === -1) {
            return 'item does not exist';
          }

          // remove item
          cart.items.splice(itemIndex, 1);
          // save updated cart
          await cart.save();
          return 'item removed succesfully';
        } catch (e) {
          console.log(e);
          return 'unable to remove item please try again';
        }
      },
    ),
  },
};
