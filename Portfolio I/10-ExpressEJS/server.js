const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "your_secret_key_here",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

let posts = [];

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.get("/login", (req, res) => {
  const name = req.query.name;
  if (name && name.trim() !== "") {
    req.session.name = name.trim();
    res.render("test", { name: req.session.name, security: "unsecured (GET)" });
  } else {
    res.redirect("/");
  }
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  if (name && name.trim() !== "") {
    req.session.name = name.trim();
    res.render("test", { name: req.session.name, security: "secured (POST)" });
  } else {
    res.redirect("/");
  }
});

app.get("/home", (req, res) => {
  if (!req.session.name) {
    return res.redirect("/");
  }
  res.render("home", {
    name: req.session.name,
    posts: posts,
    truncate: (text, limit) => {
      if (text.length <= limit) return text;
      return text.substring(0, limit) + "...";
    }
  });
});

app.post("/post", (req, res) => {
  if (!req.session.name) {
    return res.redirect("/");
  }
  const { title, content } = req.body;
  if (title && content) {
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title: title,
      content: content,
      author: req.session.name,
      createdAt: new Date()
    };
    posts.push(newPost);
  }
  res.redirect("/home");
});

app.get("/post/:id", (req, res) => {
  if (!req.session.name) {
    return res.redirect("/");
  }
  const postId = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).render("home", {
      name: req.session.name,
      posts: posts,
      error: "Post not found!",
      truncate: (text, limit) => text.length <= limit ? text : text.substring(0, limit) + "..."
    });
  }
  res.render("post", { name: req.session.name, post: post, error: null });
});

app.post("/post/edit/:id", (req, res) => {
  if (!req.session.name) {
    return res.redirect("/");
  }
  const postId = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1 && title && content) {
    posts[postIndex].title = title;
    posts[postIndex].content = content;
  }
  res.redirect("/home");
});

app.get("/post/delete/:id", (req, res) => {
  if (!req.session.name) {
    return res.redirect("/");
  }
  const postId = parseInt(req.params.id, 10);
  posts = posts.filter(p => p.id !== postId);
  res.redirect("/home");
});


app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }
  console.log(`Server listening on port ${port}`);
  console.log(`Open in browser: http://localhost:${port}`);
});