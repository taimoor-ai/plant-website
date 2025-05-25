import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/order/${id}`);
        const orderData = res.data;
        setOrder(orderData);

        // Fetch full product names
        const details = await Promise.all(
          orderData.products.map(async (product) => {
            const endpoint =
              product.modelType === "plants"
                ? `http://localhost:3000/product/plants/${product.productId}`
                : `http://localhost:3000/accessory/get/${product.productId}`;
            try {
              const res = await axios.get(endpoint);
              console.log(res.data)
              return {
                ...product,
                name: res.data.name,
              };
            } catch {
              return {
                ...product,
                name: "Unknown",
              };
            }
          })
        );

        setProductDetails(details);
      } catch (err) {
        console.error("Failed to fetch order details", err);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!order) {
    return <div className="p-8 text-center text-gray-500">Loading order details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6">
      {/* Close button */}
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded"
      >
        Close
      </button>

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

      {/* Order Info */}
      <div className="space-y-3 text-gray-700">
        <div><strong>Order ID:</strong> {order._id}</div>
        <div><strong>Customer:</strong> {order.user?.name}</div>
        <div><strong>Address:</strong> {order.user?.address}</div>
        <div><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</div>
        <div>
          <strong>Status:</strong>
          <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 capitalize">
            {order.status}
          </span>
        </div>
        <div><strong>Created:</strong> {formatDate(order.createdAt)}</div>
      </div>

      {/* Product list with names */}
      {productDetails.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-2">Products</h3>
          <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Model</th>
                <th className="p-3">Name</th>
                <th className="p-3">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-3 capitalize">{product.modelType}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
