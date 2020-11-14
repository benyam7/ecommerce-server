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
  },
};
