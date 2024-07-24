const express = require("express");
const {
  client,
  createProduct,
  createTables,
  createUser,
  createFavorite,
  destroyFavorite,
  fetchProducts,
  fetchFavorites,
  fetchUsers,
} = require("./db");

const server = express();
client.connect();

//middleware to use before all routes
server.use(express.json()); //parses the request body so our route can access it

//returns an array of users
server.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

//returns an array of products
server.get("/api/products", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (ex) {
    next(ex);
  }
});

//returns an array of a particular user's skills
server.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    res.send(await fetchFavorites({ user_id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
});

//adds a favorite to a particular user
server.post("/api/users/:id/favorites", async (req, res, next) => {
  try {
    res.status(201).send(
      await createFavorite({
        user_id: req.params.id,
        product_id: req.body.product_id,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

//deletes a particular user's favorite
server.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
  try {
    await destroyFavorite({ id: req.params.id, user_id: req.params.userId });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//error handling route which returns an object with an error property
server.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || err });
});

//server listening on a particular port
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));