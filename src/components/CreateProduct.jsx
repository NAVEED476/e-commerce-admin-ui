import React, { useState } from "react";
import "./create.css";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [title, settitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const accesstoken = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://e-commerce-api-ealr.onrender.com/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify({ title, desc, img, price, weight, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData.message);
        return;
      }
      settitle("");
      setDesc("");
      setPrice("");
      setImg("");
      setWeight("");
      setQuantity("");
      console.log("Product created successfully!");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const btn_Disabled = () => {
    return !title || !desc || !img || !price || !weight || !quantity;
  };

  return (
    <>
      <Link to="/main">
        <button type="submit" className="back-btn">
          Back
        </button>
      </Link>
      <div className="create-container">
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
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

          <label htmlFor="qty">Quantity</label>
          <input
            type="text"
            id="qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button type="submit" disabled={btn_Disabled()}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
