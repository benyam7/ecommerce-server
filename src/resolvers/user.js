const {
  validateRegisterUserInput,
} = require('../util/validators.js');
const { createToken } = require('../util/helpers.js');

module.exports = {
  Mutation: {
    async register(_, { userInput }, { models: { User }, secret }) {
      try {
        const {
          password,
          email,
          firstName,
          lastName,
          role,
          confirmPassword,
        } = userInput;

        //validate user input
        const { valid, userInputErrors } = validateRegisterUserInput(
          password,
          confirmPassword,
          email,
          firstName,
          lastName,
          role,
        );
        console.log(userInputErrors);
        if (!valid) {
          return {
            __typename: 'UserInputError',
            type: 'UserInputError',
            message: 'Invalid user input!',
            valid,
            userInputErrors,
          };
        }

        // check if email is unique
        const userByEmail = await User.findOne({
          email: email,
        });

        if (userByEmail) {
          userInputErrors.email = 'Email must be unique';
          return {
            __typename: 'UserInputError',
            type: 'UserInputError',
            message: 'Email already exists!',
            valid,
            userInputErrors,
          };
        }

        // hash password
        const hashedPassword = await User.hashPassword(password);

        const newUser = new User({
          createdAt: new Date().toISOString(),
          password: hashedPassword,
          email,
          firstName,
          lastName,
          role,
        });

        //save user
        const res = await newUser.save();
        return {
          __typename: 'Token',
          token: createToken(
            {
              id: res._doc._id,
              ...res,
            },
            secret,
            '30m',
          ),
        };
      } catch (err) {
        console.log(err);
        return {
          __typename: 'RegisterError',
          type: `${err}`,
          message: 'Unable to sign up please try again',
        };
      }
    },
  },
};
