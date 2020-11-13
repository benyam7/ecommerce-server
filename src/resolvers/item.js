const { combineResolvers } = require('graphql-resolvers');

const { isAuthenitcated } = require('./authorization.js');
const { validateItemInput } = require('../util/validators.js');

module.exports = {
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
  },
};
