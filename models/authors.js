const mongoose = require("mongoose");
const Book = require("./books");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

AuthorSchema.pre("remove", function (next) {
  // find books that were written by this particular author
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error("This Author still has books"));
    } else {
      next();
    }
  });
});

const Author = mongoose.model("author", AuthorSchema);

module.exports = Author;
