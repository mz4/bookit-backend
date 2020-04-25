const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Bookmark = mongoose.model('bookmark');
const BookmarkType = require('./bookmark_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBookmark: {
      type: BookmarkType,
      args: {
        content: { 
          type: GraphQLString
        }
      },
      resolve(parentValue, { content }) { 
        return (new Bookmark({ content })).save()
      }
    },
    likeBookmark: {
      type: BookmarkType,
      args: { 
        id: { 
          type: GraphQLID
        }
      },
      resolve(parentValue, { id }) {
        return Bookmark.like(id);
      }
    },
    deleteBookmark: {
      type: BookmarkType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parentValue, { id }) {
        return Bookmark.remove({ _id: id });
      }
    },
    updateBookmark: {
      type: BookmarkType,
      args: {
        id: {
          type: GraphQLID
        },
        content: {
          type: GraphQLString
        }
      },
      resolve(parentValue, { id, content }) {
        return Bookmark.update({ _id: id }, { content });
      }
    },
  }
});

module.exports = mutation;
