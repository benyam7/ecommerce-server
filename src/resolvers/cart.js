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
      isAuthenitcated,
      async (_, { itemId }, { models: { Cart }, currentUser }) => {
        try {
          // find cart by user id this also makesures current user is owner of the cart
          const cart = await Cart.findOne({
            buyer: currentUser.id,
          });

          console.log(cart, 'cart to updated');
          // return if cart doesn't exist
          if (!cart) {
            return {
              __typename: 'RemoveItemFromCartError',
              type: 'RemoveItemFromCartError',
              message: "cart dosen't exist",
            };
          }
          // get the item to be removed by itemId
          const itemIndex = cart.items.findIndex(
            (element) => element.item.toString() === itemId,
          );
          // return if item not exists
          if (itemIndex === -1) {
            return {
              __typename: 'RemoveItemFromCartError',
              type: 'RemoveItemFromCartError',
              message: 'item does not exist',
            };
          }

          // remove item
          cart.items.splice(itemIndex, 1);
          // save updated cart
          await cart.save();
          return {
            __typename: 'RemoveItemFromCartSuccess',
            type: 'RemoveItemFromCartSuccess',
            message: 'item removed succesfully',
          };
        } catch (e) {
          console.log(e);
          return {
            __typename: 'RemoveItemFromCartError',
            type: 'RemoveItemFromCartError',
            message: 'unable to remove item please try again',
          };
        }
      },
    ),
  },
};
