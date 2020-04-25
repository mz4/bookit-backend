const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const BookmarkType = new GraphQLObjectType({
  name:  'BookmarkType',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    likes: {
      type: GraphQLInt
    },
    content: {
      type: GraphQLString
    }
  })
});

module.exports = BookmarkType;
