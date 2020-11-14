const { combineResolvers } = require('graphql-resolvers');

const { isAuthenitcated } = require('./authorization.js');
const { validateQuantity } = require('../util/validators.js');

module.exports = {
  Mutation: {
    addItemsToCart: combineResolvers(
      isAuthenitcated,
      async (
        _,
        { items, cartId },
        { models: { Cart }, currentUser },
      ) => {
        try {
          const cart = new Cart({
            buyer: currentUser.id,
            items,
          });

          //   update existing cart
          if (cartId) {
            const cartAlready = await Cart.findById(cartId);

            if (!cartAlready) {
              return {
                __typename: 'AddItemsToCartError',
                type: 'AddItemsToCartError',
                message: "Your cart doesn't exist, please create one",
              };
            }
            // update cart items
            cartAlready.items = [...cartAlready.items, ...items];

            await cartAlready.save();

            return {
              __typename: 'CartAdditionSuccess',
              message: 'Cart items added successfully',
              cartId: cartAlready._id,
            };
          }
          //   if there is no cart create a new one
          await cart.save();
          return {
            __typename: 'CartAdditionSuccess',
            message: 'Cart items added successfully',
            cartId: cart._id,
          };
        } catch (e) {
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

    editItemQuantityInCart: combineResolvers(
      isAuthenitcated,
      async (
        _,
        { itemId, cartId, quantity },
        { models: { Cart }, currentUser },
      ) => {
        try {
          //   validate quanity value
          const { valid, quantityErrors } = validateQuantity(
            quantity,
          );
          console.log(valid, quantityErrors, 'is valid quantity');
          if (!valid) {
            return quantityErrors.quantity;
          }
          // find cart
          const cart = await Cart.findById(cartId);
          // check if cart exists
          if (!cart) {
            return 'cart does not exist';
          }
          // check if current user is owner of the cart
          if (cart.buyer.toString() !== currentUser.id) {
            return 'You are not the owner of the cart';
          }
          // get specific item from the cart using itemId
          cart.items.map((element) => {
            if (element.item.toString() === itemId) {
              console.log(element, 'element to be updated');
              // update quantity
              element.quantity = quantity;
              return element;
            }
            return element;
          });
          // save the update
          await cart.save();
          return 'Item quantity updated sucessfully!';
        } catch (e) {
          console.log(e);
          return 'unable to update item quantity ';
        }
      },
    ),
  },
};
