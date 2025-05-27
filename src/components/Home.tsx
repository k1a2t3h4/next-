import Link from 'next/link';

export default function Home() {
  return (
    <section>
      
        <h1 className="">Welcome to Our E-Commerce Store</h1>
        <text>
          Discover our amazing products and start shopping today!
        </text>
        
          <Link
            href="/products"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Products
          </Link>
          <Link
            href="/blog"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Read Our Blog
          </Link>
        
      </section>
   
  );
} 