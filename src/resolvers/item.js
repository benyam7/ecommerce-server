const { combineResolvers } = require('graphql-resolvers');

const {
  isAuthenitcated,
  isItemOwner,
} = require('./authorization.js');
const { validateItemInput } = require('../util/validators.js');

module.exports = {
  Query: {
    item: combineResolvers(
      isAuthenitcated,
      async (_, { itemId }, { models: { Item } }) => {
        try {
          const item = await Item.findById(itemId).populate('vendor');
          console.log(item);
          if (!item) {
            return {
              __typename: 'ItemDoesntExistError',
              message: 'Item you requested to does not exist',
              type: 'ItemDoesntExistError',
            };
          }

          console.log(item);
          return {
            __typename: 'Item',
            id: item._doc._id,
            ...item._doc,
          };
        } catch (e) {
          console.log(e);
          return {
            __typename: 'GetItemError',
            type: 'GetItemError',
            message: `${e}`,
          };
        }
      },
    ),

    items: combineResolvers(
      isAuthenitcated,
      async (_, __, { models: { Item } }) => {
        try {
          const items = await Item.find().populate('vendor');

          return {
            __typename: 'Items',
            items,
          };
        } catch (e) {
          return {
            __typename: 'GetItemsError',
            type: 'GetItemsError',
            message: `${e}`,
          };
        }
      },
    ),
  },
  Mutation: {
    async addItem(_, { newItem }, { models: { Item } }) {},

    addItem: combineResolvers(
      isAuthenitcated,
      async (
        _,
        { newItem },
        { models: { Item, User }, currentUser },
      ) => {
        const { name, price, photoUrl, description } = newItem;
        try {
          // check role
          if (currentUser.role !== 'SELLER') {
            return {
              __typename: 'AddItemError',
              type: 'AddItemError',
              message: 'You must be a seller to add item',
            };
          }

          //   validate item input values
          const {
            itemError,
            message,
            type,
            valid,
          } = validateItemInput(name, price, photoUrl, description);
          console.log(itemError);

          if (!valid) {
            return {
              __typename: 'ItemInputErrors',
              itemError,
              message,
              type,
            };
          }

          const item = new Item({
            name,
            price,
            photoUrl,
            description,
            vendor: currentUser.id,
          });

          const res = await item.save();

          const vendor = await User.findById(currentUser.id);

          return {
            __typename: 'Item',
            id: res._doc._id,
            name: res._doc.name,
            price: res._doc.price,
            photoUrl: res._doc.photoUrl,
            description: res._doc.description,
            vendor: {
              firstName: vendor.firstName,
              lastName: vendor.lastName,
              email: vendor.email,
            },
          };
        } catch (e) {
          return {
            __typename: 'AddItemError',
            type: `${e}`,
            message: 'Unable to add your item please try again',
          };
        }
      },
    ),

    deleteItem: combineResolvers(
      isAuthenitcated,
      async (_, { itemId }, { models: { Item }, currentUser }) => {
        try {
          // refactor here
          // check if item exists
          const item = await Item.findById(itemId).populate('vendor');
          console.log(item);
          if (!item) {
            return {
              __typename: 'ItemDoesntExistError',
              message: 'Item you requested to does not exist',
              type: 'ItemDoesntExistError',
            };
          }

          // check if current user is item owner
          if (item.vendor.email !== currentUser.email) {
            console.log(item.vendor.email);
            return {
              __typename: 'ItemNotOwnerError',
              type: 'ItemNotOwnerError',
              message: 'Your are not owner of this item',
            };
          }
          // delete item
          await item.delete();

          return {
            __typename: 'DeletionSuccess',
            message: 'Item successfully deleted',
          };
        } catch (err) {
          return {
            __typename: 'DeleteItemError',
            type: `${err}`,
            message: 'Unable to delete please try again',
          };
        }
      },
    ),

    editItem: combineResolvers(
      isAuthenitcated,
      async (
        _,
        { updateItem, itemId },
        { models: { Item }, currentUser },
      ) => {
        try {
          const { price, description, name, photoUrl } = updateItem;
          const {
            itemError,
            message,
            type,
            valid,
          } = validateItemInput(name, price, photoUrl, description);

          console.log(itemError);
          if (!valid) {
            return {
              __typename: 'ItemInputErrors',
              itemError,
              message,
              type,
            };
          }
          // validate the new inputs
          // refactor here
          // check if item exists
          const item = await Item.findById(itemId).populate('vendor');
          console.log(item);
          if (!item) {
            return {
              __typename: 'ItemDoesntExistError',
              message: 'Item you requested to does not exist',
              type: 'ItemDoesntExistError',
            };
          }

          // check if current user is item owner
          if (item.vendor.email !== currentUser.email) {
            console.log(item.vendor.email);
            return {
              __typename: 'ItemNotOwnerError',
              type: 'ItemNotOwnerError',
              message: 'Your are not owner of this item',
            };
          }
          // update item
          if (price) {
            item.price = price;
          }

          if (description) {
            item.description = description;
          }

          if (name) {
            item.name = name;
          }

          if (photoUrl) {
            item.photoUrl = photoUrl;
          }
          const res = await item.save();
          return {
            __typename: 'Item',
            id: res._doc._id,
            name: res._doc.name,
            price: res._doc.price,
            photoUrl: res._doc.photoUrl,
            description: res._doc.description,
            vendor: {
              firstName: item.vendor.firstName,
              lastName: item.vendor.lastName,
              email: item.vendor.email,
            },
          };
        } catch (err) {
          return {
            __typename: 'EditItemError',
            type: `${err}`,
            message: 'Unable to delete please try again',
          };
        }
      },
    ),
  },
};
