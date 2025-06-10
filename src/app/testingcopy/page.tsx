
import React from 'react';
import {Menu, X } from 'lucide-react';
import Link from 'next/link';

const topics = {
  TRENDING: ['Top Deals', 'New Arrivals', 'Most Loved'],
  MAKEUP: ['Foundation', 'Lipstick', 'Blush'],
  SKINCARE: ['Moisturizers', 'Serums', 'Sunscreen'],
  FASHION: ['Dresses', 'Shoes', 'Bags'],
  ACCESSORIES: ['Watches', 'Jewelry', 'Hats'],
  'SHOP ALL': ['All Products', 'Gift Sets', 'Best Sellers'],
} as const;

type TopicKey = keyof typeof topics;

const Header = () => {
  

  const topicNames = Object.keys(topics) as TopicKey[];

  return (
    <header className="bg-white shadow-md ">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3">
        {/* Mobile menu button */}
        <button id="mobileMenuBtn" className="sm:hidden">
          <Menu size={28} />
        </button>

        <h1 className="text-xl font-bold">ShopBrand</h1>
        <Link href="/testing">testing</Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6">
          {topicNames.map((topic) => (
            <div className="relative group" key={topic} data-dropdown>
              <span className="cursor-pointer font-medium hover:text-pink-500">
                {topic}
              </span>
              <div className="dropdown absolute top-full left-0 bg-white shadow-md mt-2 min-w-[180px] z-20 hidden">
                {topics[topic].map((sub) => (
                  <a
                    key={sub}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobileSidebar"
        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 -translate-x-full"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button id="mobileCloseBtn">
            <X size={24} />
          </button>
        </div>

        {/* Topics List */}
        <ul id="topicList">
          {topicNames.map((topic) => (
            <li
              key={topic}
              data-topic={topic}
              className="px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
            >
              {topic}
            </li>
          ))}
        </ul>

        {/* Subtopics View */}
        {topicNames.map((topic) => (
          <ul
            key={topic}
            id={`sub-${topic}`}
            data-sublist
            className="hidden"
          >
            <li
              data-back
              className="px-4 py-3 cursor-pointer text-sm text-gray-500 hover:text-black"
            >
              ← Back
            </li>
            {topics[topic].map((sub) => (
              <li
                key={sub}
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
              >
                {sub}
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Overlay */}
      <div
        id="overlay"
        className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-40 hidden"
      ></div>
    </header>
  );
};

export default Header;
