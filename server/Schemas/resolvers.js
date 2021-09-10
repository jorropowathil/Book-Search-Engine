const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    me: async () => {
        return User
    },
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id })
        }
        throw new AuthenticationError('You need to be logged in!');
        }
},

Mutation: {
    // Taken from activity 27 resolvers
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

      saveBook: async (parent, {body}, args)=> {
          if (context.user) {
              const userBooksUpdated = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { 
                    newBook: body 
                }},
                { new: true }
              );
              return userBooksUpdated;
          }
          throw new AuthenticationError("You need to be logged in!");
      },
     removeBook: async (parent,{bookId}, args)=> {
         const userBooksUpdated = await User.findOneAndUpdate(
             { _id: context.user._id},
             {$pull: {newBook: {bookId: bookId}}},
             {new: true}
            )
            return userBooksUpdated;
     }
}}

module.exports = resolvers;