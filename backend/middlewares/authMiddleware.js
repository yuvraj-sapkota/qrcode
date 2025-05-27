const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized " });
  }

  const token = authHeader.split(" ")[1];
  console.log("The generated token is ", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("The decoded code is ", decoded);

    const restaurant = await Restaurant.findById(decoded.id);
    if (!restaurant) {
      return res.status(401).json({ message: "Restaurant not found" });
    }
    req.restaurant = restaurant;
    console.log("The value of req.restaurant is : ", req.restaurant);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
