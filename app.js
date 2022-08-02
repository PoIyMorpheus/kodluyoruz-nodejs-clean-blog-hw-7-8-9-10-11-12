const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const ejs = require("ejs");
const Post = require("./models/Post");
const pageController = require("./controllers/pageController");
const postController = require("./controllers/postController");
const app = express();

//connect DB
mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);
app.post("/posts", postController.createPost);

app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPostPage);
app.get("/posts/edit/:id", pageController.getEditPage);

const port = 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
