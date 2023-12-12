// UpdateProduct.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./create.css";
import { Link } from "react-router-dom";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-api-ealr.onrender.com/product/find/${productId}`
        );
        if (response.ok) {
          const productData = await response.json();
          console.log("productData", productData);
          setTitle(productData.title);
          setDesc(productData.desc);
          setImg(productData.img);
          setPrice(productData.price);
          setWeight(productData.weight);
          setQuantity(productData.quantity);
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title, desc, img, price, weight, quantity }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData.message);
        return;
      }

      navigate("/main");
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <>
      <Link to="/main">
        <button type="submit" className="back-btn">
          Back
        </button>
      </Link>

      <div className="create-container">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
