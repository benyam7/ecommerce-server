module.exports.validateRegisterUserInput = (
  password,
  confirmPassword,
  email,
  firstName,
  lastName,
  role,
) => {
  const errors = {};

  if (firstName.trim() === '') {
    errors.firstName = 'First name must not be empty';
  }
  if (role.trim() === '') {
    errors.role = 'Role must not be empty';
  } else {
    const validRole = role === 'SELLER' || role === 'BUYER';
    if (!validRole) {
      errors.role = 'Invalid value for role';
    }
  }

  if (lastName.trim() === '') {
    errors.lastName = 'Last name must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not empty';
  } else {
    if (password.length < 8) {
      errors.password = 'Password length must be greater than 8';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
  }
  return {
    __typename: 'UserInputError',
    userInputErrors: errors,
    type: 'UserInputError',
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const userInputErrors = {};
  if (email.trim() === '') {
    userInputErrors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      userInputErrors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    userInputErrors.password = 'Password must not be empty';
  }

  return {
    __typename: 'UserInputError',
    userInputErrors,
    valid: Object.keys(userInputErrors).length < 1,
  };
};

module.exports.validateItemInput = (
  name,
  price,
  photoUrl,
  description,
) => {
  const itemInputErrors = {};
  if (name && name.trim() === '') {
    itemInputErrors.name = 'Name must not be empty';
  }

  if (description && description.trim() === '') {
    itemInputErrors.description = 'Description must not be empty';
  }

  if (photoUrl && photoUrl.trim() === '') {
    itemInputErrors.photoUrl = 'Photo url must not be empty';
  } else {
    if (photoUrl) {
      try {
        new URL(photoUrl);
      } catch (e) {
        itemInputErrors.photoUrl = 'Photo url must be a valid url';
      }
    }
  }

  if (price && price <= 0) {
    itemInputErrors.price = 'Price must be greater that zero';
  }

  return {
    __typename: 'ItemInputErrors',
    type: 'ItemInputErrors',
    message: 'invalid item value',
    itemError: itemInputErrors,
    valid: Object.keys(itemInputErrors).length < 1,
  };
};

module.exports.validateQuantity = (quantity) => {
  const quantityErrors = {};
  if (quantity && quantity < 0) {
    quantityErrors.quantity = 'Quantity must be greater than zero';
  }
  return {
    quantityErrors,
    valid: Object.keys(quantityErrors).length < 1,
  };
  // return {
  //   __typename: 'QuantityInputError',
  //   type: 'QuantityInputError',
  //   qunatityErrors,
  //   valid: Object.keys(qunatityErrors).length < 1,
  // };
};
