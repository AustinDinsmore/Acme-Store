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
  
  const init = async () => {
    await client.connect();
  
    await createTables();
    console.log("create tables");
  
    const [deku, thor, loki] = await Promise.all([
      createUser({ username: "Deku", password: "IloveSalmon" }),
      createUser({ username: "Thor", password: "MommaBoy" }),
      createUser({ username: "Loki", password: "123abc" }),
    ]);
  
    console.log(await fetchUsers());
    console.log("Seeded users");
  
    const [pen, socks, mouse] = await Promise.all([
      createProduct({ name: "pen" }),
      createProduct({ name: "socks" }),
      createProduct({ name: "mouse" }),
    ]);
  
    console.log(await fetchProducts());
    console.log("Seeded products");
  
    const [us1, us2, us3] = await Promise.all([
      createFavorite({ user_id: loki.id, product_id: pen.id }),
      createFavorite({ user_id: thor.id, product_id: socks.id }),
      createFavorite({ user_id: deku.id, product_id: fetch.id }),
    ]);
  
    console.log("Thor favorite", await createFavorite({ user_id: thor.id }));
    console.log("Seeded user favorites");
  
    await destroyFavorite({ id: us2.id, user_id: thor.id });
  
    console.log("Thor favorits", await fetchFavorites({ user_id: thor.id }));
  
    await client.end();
  };
  
  init();