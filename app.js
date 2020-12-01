if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejs = require("ejs");
const express_layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const index_route = require("./routes/index");
const authors_route = require("./routes/authors");
const books_route = require("./routes/books");

const app = express();
// set view engine
app.set("view engine", "ejs");
// set  location of views
app.set("views", `${__dirname}/views`);
// location of layout files [all files are to be embedded in layout fils]
app.set("layout", "layouts/layout");
app.use(express_layouts);
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
// PUT OUR STAIC LIKE CSS AND
app.use(express.static("public"));

// connect to database
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected successful"));

// use routes
app.use("/", index_route);
app.use("/authors", authors_route);
app.use("/books", books_route);

app.listen(process.env.PORT || 4000);




