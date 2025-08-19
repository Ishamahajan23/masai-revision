import React, { useState } from "react";

const ProductCard = React.memo(function ProductCard({
  product,
  onRemove,
  onUpdateStock,
}) {
  const [stock, setStock] = useState(product.stock);

  // Update local stock and propagate change
  const handleStockChange = (e) => {
    const newStock = Number(e.target.value);
    setStock(newStock);
    onUpdateStock(product.id, newStock);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col gap-2 border hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
      <div className="text-gray-700">
        Price:{" "}
        <span className="font-semibold text-blue-600">${product.price}</span>
      </div>
      <div className="text-gray-700">
        Category: <span className="font-medium">{product.category}</span>
      </div>
      <div className="text-gray-700">
        Rating: <span className="font-medium">{product.rating}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Stock:</span>
        <input
          type="number"
          value={stock}
          min={0}
          onChange={handleStockChange}
          className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
      <button
        className="mt-2 px-3 py-2 flex items-center gap-2 bg-red-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
        onClick={() => onRemove(product.id)}
        title="Remove this product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Remove
      </button>
    </div>
  );
});

export default ProductCard;
