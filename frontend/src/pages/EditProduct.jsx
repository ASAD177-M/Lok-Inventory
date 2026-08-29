import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./AddProduct.css"; // Reuse existing styles

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch product details on load
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get("/api/products");
        const found = response.data.data.find((p) => p._id === id);
        if (found) {
          setProduct({
            name: found.name,
            category: found.category,
            price: found.price,
            stock: found.stock,
            description: found.description || "",
          });
          setCurrentImage(found.image);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully! 📝");
      navigate("/products");
    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-product-page">
      <div className="add-product-container">
        <div className="add-product-header">
          <span>INVENTORY</span>
          <h1>Edit Product</h1>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={product.category} onChange={handleChange} required>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Accessories">Accessories</option>
              <option value="Clothing">Clothing</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label>Product Image (Optional to update)</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/products")}>Cancel</button>
            <button type="submit" className="save-product-btn" disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProduct;