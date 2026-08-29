import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import api from "../api/api";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Dynamic Backend Base URL (Vite environment variable ya fallback live Render URL)
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    api.defaults.baseURL ||
    "https://your-render-backend-url.onrender.com"; // 👈 Apne Render URL se replace kar sakte hain

  const categories = [
    "All",
    "Electronics",
    "Furniture",
    "Accessories",
    "Clothing",
    "Stationery",
  ];

  const getProducts = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data.data || []);
    } catch (error) {
      console.log("Products fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // DELETE HANDLER FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/products/${id}`);

      // UI state update
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
      alert("Product deleted successfully! 🗑️");
    } catch (error) {
      console.log("Delete product error:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Image Source Generator Helper
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/300x300?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;

    // Ensure leading slash
    const formattedPath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    // Clean base URL trailing slash
    const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");

    return `${cleanBaseUrl}${formattedPath}`;
  };

  return (
    <main className="products-page">
      <section className="products-header">
        <div>
          <span>INVENTORY</span>
          <h1>Products</h1>
          <p>Manage and track all your products in one place.</p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>
      </section>

      <section className="products-controls">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-filter">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="no-products">
          <h2>Loading products...</h2>
        </div>
      ) : (
        <>
          <div className="products-count">
            <span>{filteredProducts.length} Products</span>
          </div>

          <section className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-image">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/300x300?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h2>{product.name}</h2>

                    <div className="product-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>

                    <div className="product-bottom">
                      <span
                        className={`stock-status ${
                          product.stock === 0
                            ? "out-of-stock"
                            : product.stock <= 5
                            ? "low-stock"
                            : "in-stock"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of Stock"
                          : product.stock <= 5
                          ? "Low Stock"
                          : "In Stock"}
                      </span>

                      <span className="stock-count">
                        {product.stock} units
                      </span>
                    </div>

                    {/* ACTION BUTTONS: EDIT & DELETE */}
                    <div className="card-actions">
                      <button
                        className="edit-card-btn"
                        onClick={() =>
                          navigate(`/edit-product/${product._id}`)
                        }
                      >
                        Edit
                      </button>

                      <ProtectedRoute>
                        <button
                          className="delete-card-btn"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </ProtectedRoute>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <span>📦</span>
                <h2>No products found</h2>
                <p>Try changing your search or category.</p>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Products;