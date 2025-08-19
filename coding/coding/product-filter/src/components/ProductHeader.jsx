import React from "react";

const ProductHeader = React.memo(function ProductHeader({
  total,
  activeCategory,
  sortOrder,
}) {
  return (
    <header className="mb-6 p-4 border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-2 md:mb-0">
       
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1 drop-shadow">
            Products Dashboard
          </h2>
          <div className="text-sm">
            Total Products: <span className="font-semibold">{total}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium">Category:</span>
          <span className="bg-white/30 px-2 py-1 rounded text-white font-semibold border border-white/40 shadow-sm">
            {activeCategory}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Sort:</span>
          <span className="bg-white/30 px-2 py-1 rounded text-white font-semibold border border-white/40 shadow-sm">
            {sortOrder === "low-to-high" ? "Low to High" : "High to Low"}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.7s ease; }
      `}</style>
    </header>
  );
});

export default ProductHeader;
