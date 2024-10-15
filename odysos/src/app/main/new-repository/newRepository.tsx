// app/src/auth/login/page.jsx
import { useState } from 'react';

export default function NewRepository() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Korrekte Typisierung des Events als FormEvent
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login erfolgreich');
      } else {
        setMessage(data.message || 'Fehler beim Login');
      }
    } catch (error) {
      setMessage('Fehler beim Login');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Willkommen auf der newRepository!
      </h1>

      {/* Input-Feld für den Projektnamen */}
      <div className="mb-6">
        <label
          htmlFor="projectName"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Projektname:
        </label>
        <input
          id="projectName"
          type="text"
          placeholder="Gib den Namen des Projekts ein"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Buttons für Selbst erstellt, KI generiert, KI Hilfe */}
      <div className="flex space-x-4 mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
          Selbst erstellt
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
          KI generiert
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow hover:bg-purple-600">
          KI Hilfe
        </button>
      </div>

      {/* Card mit Textarea und Hinzufügen Button */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Code hinzufügen</h2>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-600">
            {/* SVG Plus-Symbol */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">Hinzufügen</span>
          </button>
        </div>

        {/* Textarea - rows sollte eine Zahl sein */}
        <textarea
          placeholder="Füge deinen Code hier ein..."
          rows={6}  
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      {/* Content der Seite */}
      <p className="text-gray-700">Hier ist der Inhalt der newRepository.</p>
    </div>
  );
}