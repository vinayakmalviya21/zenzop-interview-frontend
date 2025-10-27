import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setformData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("https://zenzop-interview-backend.vercel.app/api/products", formData);
    setformData({ name: "", description: "", price: "" });
    fetchProducts();
  };

  const fetchProducts = async () => {
    const res = await axios.get("https://zenzop-interview-backend.vercel.app/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🛍️ Product Management
      </h1>

      {/* Product Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Add New Product
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            placeholder="Price (₹)"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            ➕ Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          All Products
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products yet 😶</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                <p className="mt-2 text-indigo-600 font-bold">
                  ₹{p.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
