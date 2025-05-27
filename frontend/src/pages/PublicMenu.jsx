import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PublicMenu = () => {
  const { id } = useParams(); // restaurantId from URL
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/public/menu/${id}`);
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error("Failed to load menu", error);
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Restaurant Menu</h1>
      {menu.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow p-4 mb-3">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray-700">Rs. {item.price}</p>
          {item.description && (
            <p className="text-sm text-gray-500">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PublicMenu;
