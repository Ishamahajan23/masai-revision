import { useState, useMemo, useCallback } from "react";
import ProductHeader from "./components/ProductHeader";
import ProductCard from "./components/ProductCard";
import "./App.css";


const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    rating: 4.5,
    stock: 10,
  },
  {
    id: 2,
    name: "Shoes",
    price: 80,
    category: "Fashion",
    rating: 4.2,
    stock: 25,
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 150,
    category: "Home",
    rating: 4.0,
    stock: 8,
  },
  {
    id: 4,
    name: "Smartphone",
    price: 900,
    category: "Electronics",
    rating: 4.7,
    stock: 15,
  },
  {
    id: 5,
    name: "T-shirt",
    price: 25,
    category: "Fashion",
    rating: 4.1,
    stock: 50,
  },
  {
    id: 6,
    name: "Blender",
    price: 60,
    category: "Home",
    rating: 3.9,
    stock: 12,
  },
  {
    id: 7,
    name: "Headphones",
    price: 200,
    category: "Electronics",
    rating: 4.3,
    stock: 20,
  },
  {
    id: 8,
    name: "Jeans",
    price: 45,
    category: "Fashion",
    rating: 4.0,
    stock: 30,
  },
  {
    id: 9,
    name: "Desk Lamp",
    price: 35,
    category: "Home",
    rating: 4.2,
    stock: 18,
  },
  {
    id: 10,
    name: "Tablet",
    price: 400,
    category: "Electronics",
    rating: 4.4,
    stock: 7,
  },
];

const CATEGORY_OPTIONS = [
  "All",
  ...Array.from(new Set(DUMMY_PRODUCTS.map((p) => p.category))),
];

function App() {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("low-to-high");

  // Memoized filtered and sorted products
  const visibleProducts = useMemo(() => {
    let filtered =
      category === "All"
        ? products
        : products.filter((p) => p.category === category);
    let sorted = [...filtered].sort((a, b) =>
      sortOrder === "low-to-high" ? a.price - b.price : b.price - a.price
    );
    return sorted;
  }, [products, category, sortOrder]);

  // Memoized total price
  const totalPrice = useMemo(() => {
    return visibleProducts.reduce((sum, p) => sum + p.price, 0);
  }, [visibleProducts]);

  // Add, remove, update stock handlers
  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const removeProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateStock = useCallback((id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  }, []);

  return (
    <div className="max-h-screen w-full bg-gray-50">
      <ProductHeader
        total={products.length}
        activeCategory={category}
        sortOrder={sortOrder}
      />
      <div className="controls mb-4 p-4 bg-white shadow rounded-lg flex gap-4">
        <select
          className="border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className="container mx-auto p-4 flex  justify-between items-center">
        <div className="text-3xl">Total Price: ${totalPrice}</div>
        {/* Example add product button for demo */}
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          onClick={() =>
            addProduct({
              id: Date.now(),
              name: "New Product",
              price: 100,
              category: "Home",
              rating: 4,
              stock: 5,
            })
          }
        >
          Add Product
        </button>
      </div>
    
      <div className="grid grid-cols-3 gap-2 container mx-auto">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={removeProduct}
            onUpdateStock={updateStock}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
