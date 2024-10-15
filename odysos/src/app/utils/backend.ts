// Funktion zum Speichern des Refresh Tokens
export function setRefreshToken(token:string) {
    localStorage.setItem('refreshToken', token);
}
const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };
  

// Funktion zum Abrufen des Refresh Tokens
export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

// Funktion für den Login
export async function login(email:string, password:string) {
    const response = await apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    // Tokens speichern
    setToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    return response;
}

// Funktion zum Erneuern des Access Tokens
export async function refreshAccessToken() {
    const refreshToken = getRefreshToken();

    const response = await apiFetch('/api/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
    });

    // Neues Access Token speichern
    setToken(response.accessToken);
    return response;
}
export const apiFetch = async (url: string, options: RequestInit = {}) => {
    // Hole den JWT-Token (zum Beispiel aus dem localStorage)
    const token = localStorage.getItem('accessToken');
  
    // Erstelle das Header-Objekt und füge den Authorization-Header hinzu, falls der Token existiert
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  
    // Füge optionale Header hinzu, falls sie in options vorhanden sind
    if (options.headers) {
      const additionalHeaders = options.headers as Record<string, string>;
      Object.entries(additionalHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }
  
    // Führe die fetch-Anfrage mit den zusammengestellten Headern aus
    const response = await fetch(url, {
      ...options,
      headers, // Verwende das korrekt formatierte Headers-Objekt
    });
  
    // Prüfe, ob die Anfrage erfolgreich war
    if (!response.ok) {
      throw new Error(`Fehler bei der API-Anfrage: ${response.statusText}`);
    }
  
    // Parse die JSON-Antwort und gebe sie zurück
    return response.json();
  };