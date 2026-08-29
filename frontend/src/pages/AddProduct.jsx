import "./AddProduct.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  // Image state component ke andar
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // FormData
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);

      // Image
      if (image) {
        formData.append("image", image);
      }

      const response = await api.post(
        "/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", response.data);

      alert("Product added successfully! ✅");

      navigate("/products");

    } catch (error) {
      console.log("Add product error:", error);

      alert(
        error.response?.data?.message ||
        "Product Not add ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-product-page">

      <div className="add-product-container">

        {/* Header */}
        <div className="add-product-header">

          <span>INVENTORY</span>

          <h1>Add Product</h1>

          <p>
            Add a new product to your inventory.
          </p>

        </div>


        {/* Form */}
        <form
          className="add-product-form"
          onSubmit={handleSubmit}
        >

          {/* Product Name */}
          <div className="form-group">

            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* Category */}
          <div className="form-group">

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Furniture">
                Furniture
              </option>

              <option value="Accessories">
                Accessories
              </option>

              <option value="Clothing">
                Clothing
              </option>

              <option value="Stationery">
                Stationery
              </option>

            </select>

          </div>


          {/* Price */}
          <div className="form-group">

            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              placeholder="Enter price"
              value={product.price}
              onChange={handleChange}
              min="0"
              required
            />

          </div>


          {/* Stock */}
          <div className="form-group">

            <label htmlFor="stock">
              Stock Quantity
            </label>

            <input
              id="stock"
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={product.stock}
              onChange={handleChange}
              min="0"
              required
            />

          </div>


          {/* Image */}
          <div className="form-group full-width">

            <label htmlFor="image">
              Product Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {image && (
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product preview"
                />
                <p>{image.name}</p>
              </div>
            )}

          </div>


          {/* Description */}
          <div className="form-group full-width">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={handleChange}
              rows="5"
            />

          </div>


          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-product-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AddProduct;