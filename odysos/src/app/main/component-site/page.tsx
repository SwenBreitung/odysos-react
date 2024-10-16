"use client"; 
import React, { useState, useEffect } from 'react';

export default function ComponentsPage() {

    const components = {
        "components": [
          {
            "name": "Header",
            "mainLanguage": "JavaScript",
            "framework": "React",
            "version": "18.2.0", // Version hinzugefügt
            "description": "A header component that displays the user's name and a logout button.",
            "date": "2023-10-01",
            "user": "John Doe",
            "code": {
              "js": `
                function Header({ user, onLogout }) {
                  return (
                    <header className='p-4 bg-blue-600 text-white flex justify-between items-center'>
                      <h1 className='text-xl'>Welcome, {user.name}</h1>
                      <button onClick={onLogout} className='bg-white text-blue-600 p-2 rounded'>Logout</button>
                    </header>
                  );
                }
                export default Header;
              `,
              "css": `
                .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  background-color: #1E40AF;
                  padding: 20px;
                  color: white;
                }
                .header button {
                  background-color: white;
                  color: #1E40AF;
                  border-radius: 4px;
                  padding: 10px;
                }
              `
            }
          },
          {
            "name": "Sidebar",
            "mainLanguage": "JavaScript",
            "framework": "React",
            "version": "18.2.0", // Version hinzugefügt
            "description": "A sidebar component that displays navigation links and the user's profile picture.",
            "date": "2023-10-02",
            "user": "Jane Smith",
            "code": {
              "js": `
                function Sidebar({ user, menuItems }) {
                  return (
                    <aside className='p-6'>
                      <img src={user.profilePicture} alt={user.name} className='rounded-full mb-4' />
                      <nav>
                        <ul className='space-y-4'>
                          {menuItems.map(item => (
                            <li key={item.path}>
                              <a href={item.path} className='text-blue-600 hover:underline'>{item.label}</a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </aside>
                  );
                }
                export default Sidebar;
              `
            }
          },
          {
            "name": "Algorithm",
            "mainLanguage": "C++",
            "framework": null,
            "version": null, // Keine Version notwendig für C++
            "description": "A C++ algorithm implementation.",
            "date": "2023-10-03",
            "user": "Alice Johnson",
            "code": {
              "cpp": `
                #include <iostream>
                using namespace std;
    
                int main() {
                  cout << "Hello, World!";
                  return 0;
                }
              `
            }
          }
        ]
      };
    
  // State für die aktive Sprache pro Komponente
//   const [activeLanguage, setActiveLanguage] = useState({});
  const [activeLanguage, setActiveLanguage] = useState<Record<number, string>>({});
//   const currentComponent = components.components[0]; 
  // Funktion zum Setzen der aktiven Sprache für eine bestimmte Komponente
  const handleLanguageChange = (index: number, language: string) => {
    setActiveLanguage((prev) => ({
      ...prev,
      [index]: language
    }));
  };

  // Verwende useEffect, um die erste verfügbare Sprache als Standard zu setzen
  useEffect(() => {
    components.components.forEach((component, index) => {
      if (!activeLanguage[index]) {
        const defaultLanguage = Object.keys(component.code)[0]; // Nimm die erste verfügbare Sprache
        setActiveLanguage((prev) => ({
          ...prev,
          [index]: defaultLanguage
        }));
      }
    });
  }, [activeLanguage, components.components]); 

  
  return (
    <div className="space-y-6">
      {components.components.map((component, index) => {
        // Bestimme die aktuelle oder standardmäßige aktive Sprache
        const currentLanguage = activeLanguage[index] || Object.keys(component.code)[0];

        return (
          <div key={index} className="p-4 border rounded bg-gray-100">
            <h2 className="text-black text-xl font-bold mb-2">{component.name}</h2>
            <p className="italic text-sm text-black">Main Language: {component.mainLanguage}</p>
            {component.framework && (
              <div className='flex gap-4'>
                <p className="italic text-sm text-black">Framework: {component.framework}</p>
                {component.version && <span className="italic text-sm text-black">Version: {component.version}</span>}
              </div>
            )}
            <p className="italic text-sm text-black">{component.description}</p>
            <p className="italic text-sm text-black">{component.date}</p>
            <p className="italic text-sm text-black">Erstellt durch: {component.user}</p>

            {/* Dynamische Sprach-Auswahl Buttons */}
            <div className="mb-4">
              {Object.keys(component.code).map((language) => (
                <button
                  key={language}
                  className={`mr-2 p-2 rounded min-w-24 hover:bg-blue-400 ${
                    currentLanguage === language
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                  onClick={() => handleLanguageChange(index, language)}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Dynamische Code-Anzeige basierend auf ausgewählter Sprache */}
            <pre className="bg-gray-800 text-white p-4 rounded">
              <code>
              {component.code[currentLanguage as keyof typeof component.code]?.trim()}
              </code>
            </pre>
          </div>
        );
      })}
    </div>
  );
}
