const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem")


router.get("/menu/:restaurantId", async (req, res) => {
  try {
    const menu = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Error loading menu", error: err.message });
  }
});

module.exports = router;
