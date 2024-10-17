// "use client";
// export default function HeaderPage() {



//     return (
//       <header className="bg-gray-800 p-4">
//         <div className="container mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold">Odysos</h1>
//           <nav className="mt-2">
//             <a href="/" className="text-gray-300 hover:text-white transition-colors">
//               Startseite
//             </a>
//           </nav>
//         </div>
//       </header>
//     );
//   }

// src/app/header.tsx
"use client";
import { useLayout } from './../../utils/layoutServies';

const Header = () => {
  const { toggleSidebarVisibility } = useLayout();  // Steuert die Sichtbarkeit

  const handleClick = () => {
    console.log('Header: Button clicked, toggling sidebar visibility');
    toggleSidebarVisibility();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    {/* Button mit SVG für das Menü */}
    <div className='flex gap-5'>
    <button onClick={handleClick} className="focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <h1 className="text-2xl md:text-3xl font-bold">Odysos</h1>
    </div>
    {/* Name und V (ganz rechts ausgerichtet) */}
    <div className="flex items-center space-x-2">
      <span>name</span>
      <span className="border-2 border-emerald-900 w-10 h-10 rounded-full flex items-center justify-center">
        V
      </span>
    </div>
  </header>
  );
};

export default Header;
