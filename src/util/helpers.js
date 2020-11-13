const jwt = require('jsonwebtoken');

const createToken = async (user, secret, expiresIn) => {
  const { id, email, role, firstName, lastName, createdAt } = user;
  return jwt.sign(
    {
      id,
      email,
      role,
      firstName,
      lastName,
      createdAt,
    },
    secret,
    {
      expiresIn,
    },
  );
};

module.exports = { createToken };
