const QRCode = require("qrcode");

const generateQRCode = async (req, res) => {
  const restaurantId = req.restaurant; // set in auth middleware

  console.log("restaurantId from qrController is ", restaurantId);
  const publicUrl = `http://localhost:5173/menu/${restaurantId}`; // frontend public page
  console.log("Public url is ", publicUrl);

  try {
    const qrImage = await QRCode.toDataURL(publicUrl); // generates base64 PNG
    res.json({ qrImage, publicUrl });
  } catch (err) {
    res
      .status(500)
      .json({ message: "QR Code generation failed", error: err.message });
  }
};

module.exports = { generateQRCode };
