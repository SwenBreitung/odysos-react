"use client";
export default function HeaderPage() {
    return (
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Odysos</h1>
          <nav className="mt-2">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Startseite
            </a>
          </nav>
        </div>
      </header>
    );
  }