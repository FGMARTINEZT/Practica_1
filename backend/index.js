const express = require("express");
const sequelize = require("./config/Database");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
