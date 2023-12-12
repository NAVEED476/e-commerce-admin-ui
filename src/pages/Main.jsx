// Main.js
import React, { useEffect, useState } from "react";
import "./main.css";
import { Link } from "react-router-dom";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const accesstoken = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/product/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://e-commerce-api-ealr.onrender.com/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${accesstoken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData.message);
        return;
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      console.log("Product deleted successfully!");
      setLoading(false)
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-message">Loading...!</p>
      </div>
    );
  }

  return (
    <>
      <div className="create-btn">
        <Link to="/create">
          <button className="btn1">Create</button>
        </Link>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.desc}</td>
                <td>
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product.price}</td>
                <td>{product.weight}</td>
                <td>{product.quantity}</td>
                <td>
                  <Link to={`/update/${product._id}`}>
                    <button onClick={()=>{console.log(product._id)}}>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Main;
