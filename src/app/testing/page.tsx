import Script from 'next/script';
import React from 'react';
const topics = {
    TRENDING: ['Top Deals', 'New Arrivals', 'Most Loved'],
    MAKEUP: ['Foundation', 'Lipstick', 'Blush'],
    SKINCARE: ['Moisturizers', 'Serums', 'Sunscreen'],
    FASHION: ['Dresses', 'Shoes', 'Bags'],
    ACCESSORIES: ['Watches', 'Jewelry', 'Hats'],
    'SHOP ALL': ['All Products', 'Gift Sets', 'Best Sellers'],
  };
  

  const Header = () => {
    return (
      <>
        <header className="bg-white shadow-md  w-full ">
          <div className="flex justify-between items-center px-4 sm:px-8 py-3">
            {/* Mobile menu button */}
            <button id="menuBtn" className="sm:hidden">
              ☰
            </button>
  
            <h1 className="text-xl font-bold">ShopBrand</h1>
        
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex gap-6">
              {Object.keys(topics).map((topic) => (
                <div key={topic} className="relative group">
                  <span className="cursor-pointer font-medium hover:text-pink-500">
                    {topic}
                  </span>
                  <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border shadow-md min-w-[180px] z-50">
                    {topics[topic as keyof typeof topics].map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
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
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform -translate-x-full transition-transform duration-300"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <button id="backBtn" className="text-sm text-gray-600 hidden">
                ← Back
              </button>
              <h2 id="menuTitle" className="text-lg font-semibold">
                Menu
              </h2>
              <button id="closeBtn">✕</button>
            </div>
  
            <ul id="topicList">
              {Object.keys(topics).map((topic) => (
                <li
                  key={topic}
                  className="px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
                  data-topic={topic}
                >
                  {topic}
                </li>
              ))}
            </ul>
  
            {Object.entries(topics).map(([topic, subs]) => (
              <ul
                key={topic}
                id={`sub-${topic}`}
                className="hidden"
                data-sublist
              >
                {subs.map((sub) => (
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
            className="fixed inset-0 bg-black bg-opacity-40 z-40 hidden sm:hidden"
          ></div>
        </header>
        <Script id="header-behavior" strategy="afterInteractive">
          {`
            // Mobile menu functionality
            const sidebar = document.getElementById('mobileSidebar');
            const overlay = document.getElementById('overlay');
            const menuBtn = document.getElementById('menuBtn');
            const closeBtn = document.getElementById('closeBtn');
            const backBtn = document.getElementById('backBtn');
            const menuTitle = document.getElementById('menuTitle');
            const topicList = document.getElementById('topicList');
            const subLists = document.querySelectorAll('[data-sublist]');

            // Desktop dropdown functionality
            const topicItems = document.querySelectorAll('.group');
            topicItems.forEach((item) => {
              const dropdown = item.querySelector('div');
              
              item.addEventListener('mouseenter', () => {
                dropdown?.classList.remove('hidden');
              });
              
              item.addEventListener('mouseleave', () => {
                dropdown?.classList.add('hidden');
              });
            });

            menuBtn.addEventListener('click', () => {
              sidebar.classList.remove('-translate-x-full');
              overlay.classList.remove('hidden');
            });

            closeBtn.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);

            function closeMenu() {
              sidebar.classList.add('-translate-x-full');
              overlay.classList.add('hidden');
              showTopics();
            }

            function showTopics() {
              topicList.classList.remove('hidden');
              backBtn.classList.add('hidden');
              menuTitle.textContent = 'Menu';
              subLists.forEach((el) => el.classList.add('hidden'));
            }

            document.querySelectorAll('[data-topic]').forEach((el) => {
              el.addEventListener('click', () => {
                const topic = el.getAttribute('data-topic');
                topicList.classList.add('hidden');
                backBtn.classList.remove('hidden');
                menuTitle.textContent = topic;
                document.getElementById('sub-' + topic).classList.remove('hidden');
              });
            });

            backBtn.addEventListener('click', showTopics);
          `}
        </Script>
      </>
    );
  };
  
  export default Header;
  