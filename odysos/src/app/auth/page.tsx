import React from 'react';
import Layout from './layout';

export default function HomePage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Welcome to the GitHub Clone!</h1>
      <p>This is the main content area. You can add repositories or explore here.</p>
    </Layout>
  );
}