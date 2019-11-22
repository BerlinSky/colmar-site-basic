/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults({
  static: "node_modules/jso-server/dist"
});

// Set the middleware
server.use(middlewares);

// Handle POST, PUT and PATCH
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 0);
})

// Add createAt
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/books/", function(req, res, next) {
  const error = validateBook(req.body);

  if (error) {
    res.status(400).send(error);
  }
  else {
    res.body.slug = createSlug(req.body.title);
    next();
  }
});

server.use(router);

const port = 9091;
server.listen(port, () => {
  console.log(` JSON Sever is running on port ${port}` );
});

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateBook(book) {
  if (!book.title) return "Title is required.";
  if (!book.authorId) return "Author is required.";
  if (!book.category) return "Category is required.";
  return "";
}
