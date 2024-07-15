const Product = require("../models/Product");
const Order = require("../models/Order");

let cart = [];

exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const product = cart.find((item) => item.productId === productId);
  if (product) {
    product.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  res.json(cart);
};

exports.getCartItems = (req, res) => {
  res.json(cart);
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.params;
  cart = cart.filter((item) => item.productId !== productId);
  res.json(cart);
};

exports.checkoutCart = async (req, res) => {
  const { name, email, address } = req.body;
  const t = await sequelize.transaction();

  try {
    const products = await Product.findAll({
      where: {
        id: cart.map((item) => item.productId),
      },
      transaction: t,
    });

    let total = 0;
    const orderItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
      total += product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const order = await Order.create(
      {
        products: orderItems,
        total,
        status: "Pending",
      },
      { transaction: t }
    );

    for (const item of orderItems) {
      const product = products.find((p) => p.id === item.productId);
      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    await t.commit();
    cart = [];
    res.json(order);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};
