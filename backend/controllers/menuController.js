const mongoose = require("mongoose");
const MenuItem = require("../models/menuItem");

const addMenuItem = async (req, res) => {
  const {
    restaurant,
    name,
    price,
    description,
    category,
    available,
  } = req.body;

  try {
    const newItem = new MenuItem({
      restaurant: req.restaurant,
      name,
      price,
      description,
      category,
      available,
    });

    await newItem.save();
    res.status(200).json({ message: "Item added successfully", newItem });
  } catch (error) {
    console.log("Error while adding menu item", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: `{${error}}` });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.find({ restaurant: req.restaurant });
    if (!item) {
      res.status(400).json({ message: "No item to display" });
    }
    res.json(item);
  } catch (error) {
    console.log("Error while getting the menu item", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: `{${error}}` });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findOneAndUpdate(
      { _id: req.params.id, restaurant: req.restaurant },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findOneAndDelete({
      _id: req.params.id,
      restaurant: req.restaurant,
    });
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

module.exports = { addMenuItem, getMenuItem, updateMenuItem, deleteMenuItem };
