import "./Invoice.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function Invoice() {

  const { id } = useParams();

  const [sale, setSale] = useState(null);

  useEffect(() => {

    const fetchSale = async () => {

      try {

        const response = await api.get(
          `/api/sales/${id}`
        );

        setSale(response.data.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchSale();

  }, [id]);


  if (!sale) {
    return <p>Loading invoice...</p>;
  }


  return (

    <div className="invoice-page">

      <div className="invoice">

        <div className="invoice-header">

          <div>
            <h1>Lok Inventory</h1>
            <p>Product Invoice</p>
          </div>

          <div>
            <strong>
              {sale.invoiceNumber}
            </strong>

            <p>
              {new Date(
                sale.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>


        <hr />


        <div className="customer-info">

          <h3>Customer</h3>

          <p>
            Name: {sale.customerName}
          </p>

          {sale.customerPhone && (
            <p>
              Phone: {sale.customerPhone}
            </p>
          )}

        </div>


        <table className="invoice-table">

          <thead>

            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>

          </thead>

          <tbody>

            {sale.items.map((item) => (

              <tr key={item.productId}>

                <td>{item.name}</td>

                <td>₹{item.price}</td>

                <td>{item.quantity}</td>

                <td>₹{item.total}</td>

              </tr>

            ))}

          </tbody>

        </table>


        <div className="invoice-summary">

          <p>
            Subtotal:
            <strong> ₹{sale.subtotal}</strong>
          </p>

          <p>
            Discount:
            <strong> ₹{sale.discount}</strong>
          </p>

          <h2>
            Grand Total:
            <strong> ₹{sale.grandTotal}</strong>
          </h2>

        </div>


        <div className="invoice-actions">

          <button onClick={() => window.print()}>
            🖨️ Print / Save PDF
          </button>

          <button
            onClick={() =>
              navigator.share?.({
                title: sale.invoiceNumber,
                text: `Invoice ${sale.invoiceNumber} - ₹${sale.grandTotal}`,
              })
            }
          >
            📤 Share
          </button>

        </div>

      </div>

    </div>

  );
}

export default Invoice;