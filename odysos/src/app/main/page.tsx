import React, { useState } from 'react';

export default function HomePage() {
  const [content, setContent] = useState("Initial content");

  const changeContent = () => {
    setContent("New dynamic content");
  };

  return (
    <div>
      <h1>{content}</h1>
      <button onClick={changeContent}>Change Content</button>
    </div>
  );
}