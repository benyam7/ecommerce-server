module.exports = {
  Mutation: {
    async register(parent, { userInput }, { models: { User } }) {
      try {
        //validate user input

        // check if email is unique

        // hash password

        const user = new User({
          createdAt: new Date().toISOString(),
          ...userInput,
        });

        //save user
        await user.save();
        return 'user added';
      } catch (err) {
        console.log(err);
      }
    },
  },
};
