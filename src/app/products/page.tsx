import React from 'react';

// Sample product data
const products = [
  { id: '1', title: 'Elegant Wooden Chair', price: '$120', description: 'Crafted from premium oak, this chair adds a sophisticated touch to any living space.', imageUrl: '/images/products/chair1.jpg', href: '/products/1' },
  { id: '2', title: 'Modern Leather Sofa', price: '$850', description: 'Luxurious leather sofa with sleek lines, perfect for contemporary interiors.', imageUrl: '/images/products/sofa1.jpg', href: '/products/2' },
  { id: '3', title: 'Minimalist Desk Lamp', price: '$45', description: 'A slim, adjustable lamp that provides warm illumination for any workspace.', imageUrl: '/images/products/lamp1.jpg', href: '/products/3' },
  { id: '4', title: 'Cozy Knit Throw', price: '$35', description: 'Soft, breathable throw perfect for adding comfort and style to your couch.', imageUrl: '/images/products/throw1.jpg', href: '/products/4' },
  { id: '5', title: 'Stylish Ceramic Vase', price: '$28', description: 'Hand‑painted ceramic vase that brings a pop of color to any shelf.', imageUrl: '/images/products/vase1.jpg', href: '/products/5' },
  { id: '6', title: 'Premium Bamboo Cutting Board', price: '$22', description: 'Durable, eco‑friendly cutting board with natural grain patterns.', imageUrl: '/images/products/cuttingboard1.jpg', href: '/products/6' },
];

const ProductsPage = () => {
  const totalPages = 3;
  const currentPage = 1;
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <div className="bg-primary text-white p-4 rounded-lg mb-6 text-center shadow-md">
        🎉 Free shipping on orders over $100! 🎉
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Our Premium Products
        </h1>
        <select className="mt-3 md:mt-0 border border-gray-300 rounded-md p-2">
          <option value="popularity">Sort by Popularity</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <a
            key={p.id}
            href={p.href}
            className="block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 w-full">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {p.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {p.description}
              </p>
              <div className="text-primary font-bold text-xl">{p.price}</div>
            </div>
          </a>
        ))}
      </div>

      <nav className="flex justify-center space-x-2 mt-8">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            disabled={i + 1 === currentPage}
            className={`px-3 py-1 rounded ${i + 1 === currentPage ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </section>
  );
};

export default ProductsPage;