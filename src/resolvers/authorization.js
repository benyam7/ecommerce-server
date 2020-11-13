const { skip } = require('graphql-resolvers');

// check if ther current user is authenticated or not
const isAuthenitcated = (_, __, { currentUser }) =>
  currentUser
    ? skip
    : {
        __typename: 'NotAuthenticatedUserError',
        message: 'not authenticated as a user',
        type: 'NotAuthenticatedUserError',
      };

module.exports = {
  isAuthenitcated,
};
