import { ReactNode } from 'react';
import Header from './header/page';
import Sidebar from './sidebar/page';  // Passe den Dateipfad an, falls nötig
import './../globals.css';  // Globale Styles

import  { LayoutProvider }  from './../utils/layoutServies'

interface MainLayoutProps {
    children: ReactNode; // Definiert den Typ für 'children'
  }


export default function MainLayout({ children}: MainLayoutProps) {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      <LayoutProvider>
        <Sidebar />
      </LayoutProvider>
      <div className="flex flex-grow flex-col">
      <LayoutProvider>
        <Header />
      </LayoutProvider>
        <main className="flex justify-center flex-grow container mx-auto pt-4 px-4 md:px-8">
          {children} {/* Dynamischer Inhalt der Seiten */}
        </main>
      </div>
    </div>
  );
}