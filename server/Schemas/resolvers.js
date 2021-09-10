const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    me: async () => {
        return User
    }
    
},

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
  
        return { token, user };
      },

      saveBook: async (parent,args)=> {
          if (context.user) {
              const userBooksUpdated = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { newBook: body } },
                { new: true }
              );
              return userBooksUpdated;
          }
      },
    //  removeBook: async (parent,args)=> {

    //  }
}



}

module.exports = resolvers;