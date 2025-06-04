'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/AuthWrapper';
import { useCart } from '../app/CartWrapper';
import { useDynamicState } from '../app/DynamicStateWrapper';
import { LogIn, LogOut, User, ShoppingBag, MenuIcon, Search } from 'lucide-react';

interface HeaderProps {
  data?: {
    builddata?: {
      title?: string;
      routes?: Array<{
        name: string;
        location: string;
        authRequired?: boolean;
      }>;
    };
  };
}

const Header = ({ data }: HeaderProps) => {
  const router = useRouter();
  const { user, userLogout } = useAuth();
  const { totalItems } = useCart();
  const { getStateByKey, updateState, addState } = useDynamicState();
  const { builddata } = data || {};

  // Initialize menu state if it doesn't exist
  React.useEffect(() => {
    if (!getStateByKey('menuOpen')) {
      addState('menuOpen', 'boolean', false);
    }
    if (!getStateByKey('searchQuery')) {
      addState('searchQuery', 'string', '');
    }
  }, []);

  const menuOpen = getStateByKey('menuOpen')?.value || false;
  const searchQuery = getStateByKey('searchQuery')?.value || '';

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products`);
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden text-gray-700" 
            onClick={() => updateState('menuOpen', !menuOpen)}
          >
            <MenuIcon/>
          </button>
          <a href="/" className="text-2xl font-bold text-primary">{builddata?.title || "StyleShop"}</a>
        </div>
        
        <div className={`lg:flex items-center space-x-6 ${menuOpen ? 'absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4' : 'hidden'}`}>
          {builddata?.routes?.map((route, index) => (
            (!route.authRequired || user) && (
              <a 
                key={index}
                className="text-gray-700 hover:text-primary cursor-pointer" 
                onClick={() => router.push(route.location)}
              >
                {route.name}
              </a>
            )
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="search"
              placeholder="Search..."
              className="w-64 pr-10"
              value={searchQuery}
              onChange={(e) => updateState('searchQuery', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />
            <Search/>
          </div>
          
          <a className="relative text-gray-700 hover:text-primary cursor-pointer" onClick={() => router.push('/cart')}>
            <ShoppingBag/>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <a className="text-gray-700 hover:text-primary cursor-pointer" onClick={() => router.push('/profile')}>
                <User/>
              </a>
              <button onClick={userLogout} className="text-gray-700 hover:text-primary">
                <LogOut/>
              </button>
            </div>
          ) : (
            <a className="text-gray-700 hover:text-primary cursor-pointer" onClick={() => router.push('/login')}>
              <LogIn/>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

module.exports.default = Header;
