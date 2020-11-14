const userResolver = require('./user.js');
const itemResolver = require('./item.js');
const cartResolver = require('./cart.js');

module.exports = [userResolver, itemResolver, cartResolver];
