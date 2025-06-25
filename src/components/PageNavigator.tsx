'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PageNavigatorProps {
  id: string;
  path: string;
}

export default function PageNavigator({ id, path }: PageNavigatorProps) {
  const router = useRouter();

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      router.push(path);
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [id, path, router]);

  return null;
}
