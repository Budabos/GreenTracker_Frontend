import React, { useState, useEffect } from "react";
import axios from "axios";

function Review() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products/tshirts');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold">{product.brand}</h2>
            <p>Size: {product.size}</p>
            <p>Color: {product.color}</p>
            <h3 className="text-xl font-semibold mt-4">Reviews</h3>
            {/* <ul>
              
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
