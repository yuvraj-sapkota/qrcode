const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await Restaurant.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const restaurant = new Restaurant({
      name,
      email,
      password: hashedPassword,
    });

    await restaurant.save();

    res.status(200).json({ message: "Register successfull", restaurant });
  } catch (error) {
    console.log("Error while Registering ", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: `{${error}}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const restaurant = await Restaurant.findOne({ email });
    // console.log("signing token with id ", restaurant._id);

    if (!restaurant) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPassword = bcrypt.compareSync(password, restaurant.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await jwt.sign(
      { id: restaurant._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
      },
    });
  } catch (error) {
    console.log("Error while login restaurant", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: `{${error}}` });
  }
};

const getMe = async (req, res) => {
  try {
    console.log("loging id is", req.restaurant._id);
    const user = await Restaurant.findById(req.restaurant._id).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.log("error in getMe", err);
    res.status(500).json({ msg: "Failed to get user info" });
  }
};

module.exports = { register, login, getMe };
