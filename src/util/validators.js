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
      errors.passwordLength =
        'Password length must be greater than 8';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
  }
  return {
    __typename: 'UserInputError',
    userErrors: errors,
    type: 'UserInputError',
    valid: Object.keys(errors).length < 1,
  };
};