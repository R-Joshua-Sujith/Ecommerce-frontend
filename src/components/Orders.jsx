import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles/Orders.css";
import LoadingSpinner from "./LoadingSpinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      await axios
        .get("https://maindatabase-joshua14.onrender.com/ecomAPI/orders")
        .then((res) => {
          setLoading(false);
          setOrders(res.data);
        });
    };
    getOrders();
  }, []);

  const order = (
    <div className="orderContainer">
      {orders.map((order) => (
        <div className="order">
          <div>
            <img src={order.image} height="100px" width="100px" />
          </div>
          <div>
            <p>Product Name : {order.product_Name}</p>
            <p>Quantity : {order.quantity}</p>
            <p>Price: Rs {order.price}</p>
            <p>Payment Id : {order.payment_id}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="order-heading">Your Orders</h1>
      {Loading ? <LoadingSpinner /> : order}
    </div>
  );
};

export default Orders;
