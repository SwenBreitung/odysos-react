// File: src/app/layout.tsx
"use client";

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* GitHub Logo */}
          <a href="/" className="text-2xl font-bold">
            GitHub Clone
          </a>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <a href="/pulls" className="hover:underline">
              Pull Requests
            </a>
            <a href="/issues" className="hover:underline">
              Issues
            </a>
            <a href="/marketplace" className="hover:underline">
              Marketplace
            </a>
            <a href="/explore" className="hover:underline">
              Explore
            </a>
          </nav>

          {/* User Actions */}
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded">
              Sign In
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="container mx-auto px-4 py-6 flex">
        {/* Sidebar */}
   

        {/* Main Content */}
        <main className="flex-1 bg-white shadow-lg rounded-lg p-6 ml-6">
          {children}
        </main>
      </div>
      <footer>footer</footer>
    </div>
  );
}