import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { localhostURL } from "../../../components/url";
import { showErrorToast } from "../../Toastify/Toastifynotification";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const effectCalled = useRef(false);

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true; 

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      const ShopKeepertoken = sessionStorage.getItem("ShopKeeperAcessToken");
      const shopkeeperid = sessionStorage.getItem("ShopKeeperid");

      if (!ShopKeepertoken || !shopkeeperid) {
        if (!ShopKeepertoken) showErrorToast("Token not Present");
        if (!shopkeeperid) showErrorToast("ShopKeeper Id Not Present");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${localhostURL}GetProductByCategory/${shopkeeperid}/${selectedCategory}`,
          { headers: { "x-api-key": ShopKeepertoken } }
        );
        setProducts(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // const categories = ["all", "men", "women", "kids", "old"];

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(({ ProductImg, title, description, price }, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <img
                src={ProductImg}
                alt={title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-bold mt-2">{title}</h2>
              <p className="text-gray-600">{description}</p>
              <p className="text-green-600 font-semibold mt-1">₹{price}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}
