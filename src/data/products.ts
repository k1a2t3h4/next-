export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics"
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics"
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 89.99,
    category: "Sports"
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 79.99,
    category: "Home"
  },
  {
    id: "5",
    name: "Yoga Mat",
    price: 29.99,
    category: "Sports"
  }
]; 