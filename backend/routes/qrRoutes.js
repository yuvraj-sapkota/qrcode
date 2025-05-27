const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { generateQRCode } = require("../controllers/qrController");

router.get("/generate", authMiddleware, generateQRCode);

module.exports = router;
