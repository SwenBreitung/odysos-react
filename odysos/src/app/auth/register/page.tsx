import { useState } from 'react';
import bcrypt from 'bcryptjs';


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('Registrierung erfolgreich');
      } else {
        setMessage(data.message || 'Fehler bei der Registrierung');
      }
    } catch (error) {
      setMessage('Fehler bei der Registrierung');
    }
  };
  

  return (
    <div>
      <h1>Registrieren</h1>
      <form onSubmit={handleRegister}>
      <label className="flex gap-8">
  <span className="flex ">Name:</span>
  <input
    className="bg-gray-500"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    type="text" // "type" sollte "text" sein, nicht "name"
  />
</label>
<label className="flex gap-8">
  <span className="flex ">E-Mail:</span>
  <input
    className="bg-gray-500"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)} // Korrigiert zu "setEmail"
    type="email"
  />
</label>
<br />
<label className="flex gap-2">
  <span className="flex">Passwort:</span>
  <input
    className="bg-gray-500"
    type="password"
    placeholder="Passwort"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</label>
<br />
<button type="submit">Registrieren</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}