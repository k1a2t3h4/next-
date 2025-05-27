import Link from 'next/link';
import CartCount from './CartCount';

export default function Header() {

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <section className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            E-Commerce
          </Link>
          
          
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <CartCount />
          
        </section>
      </nav>
    </header>
  );
} 