import React from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../app/AuthWrapper';
import { renderSection } from '../utils/renderSection';
interface AuthProps {
  data?: {
    builddata?: Record<string, any>;
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: any;
    };
  };
  sections?: any[];
  index?: string;
}

const Auth = ({ data, sections, index }: AuthProps) => {
  const router = useRouter();
  const { user, userLogout } = useAuth();

  return (
    <div className="flex items-center space-x-4">
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
      {sections && sections.map((section, idx) => (
        renderSection && renderSection(section, `${index}-${idx}`)
      ))}
    </div>
  );
};

export default Auth; 



'use client';

