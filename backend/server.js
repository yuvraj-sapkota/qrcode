const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const menuRoute = require("./routes/menuRoutes");
// const qrRoute = require("./controllers/qrController");
const publicRoutes = require("./routes/publicRoutes");
const qrRoutes = require("./routes/qrRoutes");

const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const _dirname = path.resolve();

connectDB();

app.use("/api/auth/", authRoute);
app.use("/api/menu/", menuRoute);
app.use("/api/public", publicRoutes);
app.use("/api/qr", qrRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the port number ${process.env.PORT}`);
});
