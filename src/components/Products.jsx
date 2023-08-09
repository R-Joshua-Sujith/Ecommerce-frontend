import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Products.css";
import LoadingSpinner from "./LoadingSpinner";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await axios
        .get("https://maindatabase-joshua14.onrender.com/ecomAPI/")
        .then((res) => {
          setLoading(false);
          setProducts(res.data);
        });
    };
    getProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    if (
      searchTerm.trim() !== "" &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const renderProduct = (
    <div className="Products">
      {filteredProducts.length == 0 ? (
        <h1>No Products Found</h1>
      ) : (
        filteredProducts.map((product) => (
          <div className="Product">
            <img
              className="product-Image"
              src={product.image}
              width="150px"
              height="150px"
              alt="product"
            />
            <p className="product-Name">{product.name}</p>
            <p className="product-Price">Rs {product.price}</p>
            <Link to={`/product/${product._id}`} className="product-Button">
              Buy
            </Link>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="Product-Container">
      <div className="filter">
        <input
          className="filter-Input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Product"
        />
        <select
          className="filter-Select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="t-shirt">T Shirt</option>
          <option value="hoodie">Hoodie</option>
          <option value="sweater">Sweater</option>
        </select>
      </div>
      {Loading ? <LoadingSpinner /> : renderProduct}
    </div>
  );
};

export default Products;
