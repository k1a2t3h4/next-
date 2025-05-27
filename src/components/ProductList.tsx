'use client'
import { useCart } from '../context/CartContext';
import { useFilter } from '../context/FilterContext';
import Cart from './Cartbutton';
const products = [
  { id: '1', name: 'Product 1', price: 99.99, category: 'electronics' },
  { id: '2', name: 'Product 2', price: 149.99, category: 'clothing' },
  { id: '3', name: 'Product 3', price: 199.99, category: 'electronics' },
];

export default function ProductList() {
  const { addToCart } = useCart();
  const { category, searchTerm, setCategory, setSearchTerm, filterProducts } = useFilter();

  const filteredProducts = filterProducts(products);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mr-4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <Cart product={product} />
          </div>
        ))}
      </div>
    </div>
  );
} 