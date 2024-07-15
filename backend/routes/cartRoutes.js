const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/", cartController.getCartItems);
router.delete("/remove/:productId", cartController.removeFromCart);
router.post("/checkout", cartController.checkoutCart);

module.exports = router;
