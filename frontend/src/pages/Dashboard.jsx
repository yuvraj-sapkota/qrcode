import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrCodeSection from "./QrCodePage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const fetchMenu = async () => {
    const res = await fetch("http://localhost:8000/api/menu", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setItems(data);
  };

  const fetchRestaurantInfo = async () => {
    const res = await fetch("http://localhost:8000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setRestaurantId(data._id); // assuming backend sends { _id, name, email }
  };

  useEffect(() => {
    fetchMenu();
    fetchRestaurantInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, price, category };

    const url = editId
      ? `http://localhost:8000/api/menu/${editId}`
      : "http://localhost:8000/api/menu";

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setName("");
      setPrice("");
      setCategory("");
      setEditId(null);
      fetchMenu();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await fetch(`http://localhost:8000/api/menu/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchMenu();
  };

  const handleEdit = (item) => {
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setEditId(item._id);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          Welcome to Your Restaurant Dashboard
        </h1>
        {restaurantId && <QrCodeSection restaurantId={restaurantId} />}
      </div>

      <h1 className="text-3xl font-bold mb-4">🍽️ Menu Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Dish Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (NPR)"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g., Veg/Non-Veg/Drinks)"
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p>
                NPR {item.price} • {item.category}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
