import { Leaf } from 'lucide-react';
import React from 'react';

export function Header() {
  return (
    <header className="bg-emerald-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center gap-2">
        <Leaf className="w-8 h-8" />
        <h1 className="text-2xl font-bold">The Tree Co</h1>
      </div>
    </header>
  );
}