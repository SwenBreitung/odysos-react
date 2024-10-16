"use client";
import { useState } from 'react';
import { login } from './../../utils/backend'; // `refreshAccessToken` entfernen

export default function Login() {
  // Zustandsvariablen für E-Mail, Passwort und Nachrichten
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };
  
  const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token);
  };

  

  // Typisiere den Event-Handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      // Login-Funktion aus utils/backend.js verwenden
      const { accessToken, refreshToken } = await login(email, password);

      // Hier speicherst du die Tokens (benutze lokal z.B. localStorage oder eine andere Methode)
      setToken(accessToken); // Diese Funktion sollte entsprechend implementiert werden
      setRefreshToken(refreshToken); // Diese Funktion sollte entsprechend implementiert werden

      setMessage('Login erfolgreich');
      // Optional: Weiterleitung zur Startseite oder andere Aktionen
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || 'Fehler beim Login');
      } else {
        setMessage('Unbekannter Fehler beim Login');
      }
   }
  };

  return (
    <div className="text-blue-500 justify-center">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          E-Mail:
          <input
            className="bg-gray-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Passwort:
          <input
            className="bg-gray-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Einloggen</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}