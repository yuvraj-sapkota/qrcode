import { QRCodeCanvas } from "qrcode.react";

const QrCodeSection = ({ restaurantId }) => {
  const publicUrl = `https://digital-menu-kgqy.onrender.com/api/qr/register/${restaurantId}`;

  return (
    <div className="mt-6 border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">📱 Your Restaurant QR Code</h2>
      <p className="mb-2 text-gray-600">Scan this to view your public menu page:</p>
      <div className="flex justify-center">
        <QRCodeCanvas value={publicUrl} size={180} />
      </div>
      <p className="mt-2 text-sm text-gray-500 break-all">{publicUrl}</p>
    </div>
  );
};

export default QrCodeSection;
