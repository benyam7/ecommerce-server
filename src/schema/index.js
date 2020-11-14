const { gql } = require('apollo-server');
const userSchema = require('./user.js');
const itemSchema = require('./item.js');
const cartSchema = require('./cart.js');
const errorsSchema = require('./errors.js');

const stitchSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [
  stitchSchema,
  userSchema,
  errorsSchema,
  itemSchema,
  cartSchema,
];
