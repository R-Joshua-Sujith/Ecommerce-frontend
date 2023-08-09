import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import "./styles/Product.css";

const Product = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        await axios
          .get(
            `https://maindatabase-joshua14.onrender.com/ecomAPI/product/${id}`
          )
          .then((response) => {
            setLoading(false);
            setName(response.data.name);
            setPrice(parseInt(response.data.price));
            setImage(response.data.image);
          });
      } catch (err) {}
    };
    getProduct();
  }, []);

  const decr = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };

  const handleSubmit = () => {
    let total = price * quantity;
    var options = {
      key: process.env.REACT_APP_KEY,
      key_secret: process.env.REACT_APP_KEY_SECRET,
      amount: total * 100,
      currency: "INR",
      name: "E Commerce",
      description: "For Project Purpose",
      handler: async function (response) {
        await axios
          .post(`https://maindatabase-joshua14.onrender.com/ecomAPI/addOrder`, {
            product_Name: name,
            quantity: quantity,
            price: total,
            image: image,
            payment_id: response.razorpay_payment_id,
          })
          .then((res) => {
            navigate("/orders");
          })
          .catch((err) => {
            alert("Payment Unsuccessful");
          });
      },
      notes: {
        address: "Bangalore",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  const product = (
    <div className="product">
      <div className="sub-section">
        <img
          className="single-image"
          src={image}
          width="200px"
          height="200px"
        />
        <p>
          <b>{name}</b>
        </p>
        <p>Rs {price}</p>
        <div className="quantity">
          <button onClick={decr}>-</button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>

        <p>
          Total <b>Rs {price * quantity}</b>
        </p>
        <button onClick={handleSubmit} className="rent">
          Pay Now
        </button>
      </div>
    </div>
  );

  return <div>{Loading ? <LoadingSpinner /> : product}</div>;
};

export default Product;
