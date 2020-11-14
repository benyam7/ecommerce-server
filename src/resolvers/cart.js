const { combineResolvers } = require('graphql-resolvers');

const { isAuthenitcated } = require('./authorization.js');
const { validateQuantity } = require('../util/validators.js');

module.exports = {
  Query: {
    cartDetails: combineResolvers(
      isAuthenitcated,
      async (_, { cartId }, { models: { Cart }, currentUser }) => {
        try {
          // populate cart details
          const cartDetails = await Cart.findById(cartId).populate({
            path: 'items',
            populate: {
              path: 'item',
              model: 'Item',
              populate: {
                path: 'vendor',
                model: 'User',
              },
            },
          });

          // check if cart exists
          if (!cartDetails) {
            return {
              __typename: 'CartDetailError',
              type: 'CartDetailError',
              message: 'Cart does not exist',
            };
          }

          // check if current user is owner of cart
          if (cartDetails.buyer.toString() !== currentUser.id) {
            return {
              __typename: 'CartDetailError',
              type: 'CartDetailError',
              message: 'You are not owner of this cart',
            };
          }
          // get total items
          const totalItems = cartDetails.items.length;
          let totalPrice = 0;
          // init items n items
          const items = [];
          let item = {};

          cartDetails.items.forEach((element, index) => {
            totalPrice += element.item.price * element.quantity;

            item.price = element.item.price;
            item.name = element.item.name;
            item.description = element.item.description;
            item.photoUrl = element.item.photoUrl;
            item.vendor =
              element.item.vendor.firstName +
              ' ' +
              element.item.vendor.lastName;

            items[index] = item;
            item = {};
          });

          // return cart detials
          return {
            __typename: 'CartDetail',
            totalItems,
            totalPrice,
            items,
          };
        } catch (e) {
          return {
            __typename: 'CartDetailError',
            type: `${e}`,
            message:
              'Unable to get your cart detalis please try again',
          };
        }
      },
    ),
  },

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
            return {
              __typename: 'EditItemQuantityInCartInputError',
              type: 'EditItemQuantityInCartInputError',
              message: 'Invalid input!',
              valid,
              quantity: quantityErrors.quantity,
            };
          }
          // find cart
          const cart = await Cart.findById(cartId);
          // check if cart exists
          if (!cart) {
            return {
              __typename: 'EditItemQuantityInCartError',
              type: 'EditItemQuantityInCartError',
              message: 'Cart does not exist',
            };
          }
          // check if current user is owner of the cart
          if (cart.buyer.toString() !== currentUser.id) {
            return {
              __typename: 'EditItemQuantityInCartError',
              type: 'EditItemQuantityInCartError',
              message: 'You are not the owner of the cart',
            };
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
          return {
            __typename: 'EditItemQuantityInCartSuccess',
            message: 'Item quantity updated sucessfully!',
          };
        } catch (e) {
          return {
            __typename: 'EditItemQuantityInCartError',
            type: `${e}`,
            message: 'Unable to update item quantity',
          };
        }
      },
    ),
  },
};
