import "./SellProduct.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function SellProduct() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(false);


  // Get products
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await api.get("/api/products");

        setProducts(response.data.data || []);

      } catch (error) {

        console.log("Products error:", error);

      }

    };

    fetchProducts();

  }, []);


  // Add product to bill
  const addProduct = () => {

    const product = products.find(
      (p) => p._id === selectedProduct
    );

    if (!product) {
      alert("Please select a product");
      return;
    }

    if (quantity <= 0) {
      alert("Enter valid quantity");
      return;
    }

    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available`);
      return;
    }


    const existing = cart.find(
      (item) => item.productId === product._id
    );


    if (existing) {

      const updatedCart = cart.map((item) =>
        item.productId === product._id
          ? {
              ...item,
              quantity: item.quantity + Number(quantity),
              total:
                (item.quantity + Number(quantity)) *
                item.price,
            }
          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: Number(quantity),
          total: product.price * Number(quantity),
        },
      ]);

    }

    setSelectedProduct("");
    setQuantity(1);
  };


  // Remove item
  const removeItem = (productId) => {

    setCart(
      cart.filter(
        (item) => item.productId !== productId
      )
    );

  };


  // Subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.total,
    0
  );


  const grandTotal =
    subtotal - Number(discount || 0);


  // Complete sale
  const handleSale = async () => {

    if (!customerName) {
      alert("Enter customer name");
      return;
    }

    if (cart.length === 0) {
      alert("Add at least one product");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        "/api/sales",
        {
          customerName,
          customerPhone,
          items: cart,
          discount: Number(discount),
        }
      );

      console.log(response.data);

      alert("Sale completed successfully ✅");

      // Invoice page
      navigate(
        `/invoice/${response.data.data._id}`
      );

    } catch (error) {

      console.log("Sale error:", error);

      alert(
        error.response?.data?.message ||
        "Sale failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <main className="sell-page">

      <div className="sell-container">

        <h1>Sell Product</h1>

        <p>Create a new customer bill</p>


        {/* Customer */}
        <div className="customer-section">

          <h2>Customer Details</h2>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Customer Phone"
            value={customerPhone}
            onChange={(e) =>
              setCustomerPhone(e.target.value)
            }
          />

        </div>


        {/* Product */}
        <div className="add-sale-product">

          <h2>Add Product</h2>

          <select
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(e.target.value)
            }
          >

            <option value="">
              Select Product
            </option>

            {products.map((product) => (

              <option
                key={product._id}
                value={product._id}
                disabled={product.stock === 0}
              >
                {product.name} - ₹{product.price} -
                Stock: {product.stock}
              </option>

            ))}

          </select>


          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />


          <button onClick={addProduct}>
            + Add
          </button>

        </div>


        {/* Bill */}
        <div className="bill-section">

          <h2>Bill</h2>

          {cart.length === 0 ? (

            <p>No products added.</p>

          ) : (

            <table>

              <thead>

                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>

              </thead>

              <tbody>

                {cart.map((item) => (

                  <tr key={item.productId}>

                    <td>{item.name}</td>

                    <td>₹{item.price}</td>

                    <td>{item.quantity}</td>

                    <td>₹{item.total}</td>

                    <td>
                      <button
                        onClick={() =>
                          removeItem(item.productId)
                        }
                      >
                        Remove
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}


          <div className="bill-total">

            <p>
              Subtotal:
              <strong> ₹{subtotal}</strong>
            </p>

            <input
              type="number"
              min="0"
              placeholder="Discount"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value)
              }
            />

            <h2>
              Grand Total: ₹{grandTotal}
            </h2>

          </div>


          <button
            className="complete-sale-btn"
            onClick={handleSale}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Complete Sale & Generate Bill"}
          </button>

        </div>

      </div>

    </main>
  );
}

export default SellProduct;