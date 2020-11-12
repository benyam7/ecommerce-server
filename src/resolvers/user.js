module.exports = {
  Mutation: {
    async register(parent, { userInput }, { models: { User } }) {
      try {
        const user = new User({
          createdAt: new Date().toISOString(),
          ...userInput,
        });

        await user.save();
        return 'user added';
      } catch (err) {
        console.log(err);
      }
    },
  },
};
