const mongoose = require('mongoose'); //require mongoose for defining our bookmark schema
const Schema = mongoose.Schema;


/* 
  default 0 becuase when we first define a bookmark we have need to have 0 likes
*/
const BookmarkSchema = new Schema({
  likes: { type: Number, default: 0 }, 
  content: { type: String }
});

/* 
  add a function for likes in order to call BookmarkSchema.like(id) 
  return the promise so we can pass it back to our graphql resolve function
*/
BookmarkSchema.statics.like = (id) => { 
  const Bookmark = mongoose.model('bookmark');

  return Bookmark.findById(id)
    .then(bookmark => {
      ++bookmark.likes;
      return bookmark.save();
  });
}

mongoose.model('bookmark', BookmarkSchema);
