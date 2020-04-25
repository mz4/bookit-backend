const mongoose = require('mongoose');
const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;
const Bookmark = mongoose.model('bookmark');
const BookmarkType = require('./bookmark_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    bookmarks: {
      type: new GraphQLList(BookmarkType),
      resolve() {
        return Bookmark.find({});
      }
    },
    bookmark: {
      type: BookmarkType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parentValue, { id }) { 
        return Bookmark.findById(id);
      }
    }
  })
});

module.exports = RootQueryType;
