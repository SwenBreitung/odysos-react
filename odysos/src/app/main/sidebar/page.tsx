// import Link from 'next/link';
// import { useState } from 'react';

// export default function Sidebar() {
//   const [isHoverState, setHoverState] = useState(false);

//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-4">
//       <nav>
//         <ul>
//           {/* Startseite */}
//           <li className="mb-4">
//             <Link href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//               Startseite
//             </Link>
//           </li>

//           {/* Projekte */}
//           <li className="mb-4">
//             <Link href="/projekte" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//               Projekte
//             </Link>
//           </li>

//           {/* Kontakt */}
//           <li className="mb-4">
//             <Link href="/kontakt" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//               Kontakt
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import layoutService from './../../utils/layout';

// export default function Sidebar() {
//     const [isHoverState, setIsHoverState] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(layoutService.getSidebarState());
//     const [isManualToggle, setIsManualToggle] = useState(false); // Für manuelles Umschalten

//     const toggleSidebar = () => {
//         const sidebar = document.getElementById('sidebar');
//         setIsManualToggle((prev) => !prev); // Toggle isManualToggle
//         if (sidebar.classList.contains('w-64')) {
//             sidebar.classList.remove('w-64');
//             sidebar.classList.add('w-16');
//             setIsHoverState(true);
//         } else {
//             sidebar.classList.remove('w-16');
//             sidebar.classList.add('w-64');
//             setIsHoverState(false);
//         }
//     };

//     useEffect(() => {
//         layoutService.subscribe(setIsSidebarOpen);
//         return () => {
//             layoutService.unsubscribe(setIsSidebarOpen);
//         };
//     }, []);

//     return (
//         <>
//             <aside
//                 id="sidebar"
//                 className={`group ${isSidebarOpen ? 'hidden' : 'flex'} w-16 p-4 text-white h-screen bg-gray-800 transition-all duration-300 ease-in-out ${isManualToggle ? '' : 'group-hover:w-64'}`} // group-hover:w-64, wenn nicht manuell umgeschaltet wird
//                 onMouseEnter={() => {
//                     if (!isManualToggle) {
//                         setIsHoverState(true);
//                     }
//                 }}
//                 onMouseLeave={() => {
//                     if (!isManualToggle) {
//                         setIsHoverState(false);
//                     }
//                 }}
//             >
//                 <ul>
//                     <div className="flex">
//                         <button
//                             onClick={toggleSidebar}
//                             className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 focus:outline-none ${isHoverState ? 'bg-blue-500' : 'bg-gray-300'}`}
//                         >
//                             <span className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${isHoverState ? 'translate-x-8' : 'translate-x-1'}`} />
//                         </button>
//                     </div>
//                     <li className="mb-4">
//                         <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//                             Meine Komponenten
//                         </a>
//                     </li>
//                     <li className="mb-4">
//                         <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//                             Home
//                         </a>
//                     </li>
//                     <li className="mb-4">
//                         <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//                             Eigene Projekte
//                         </a>
//                     </li>
//                     <li className="mb-4">
//                         <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//                             Kontakt
//                         </a>
//                     </li>
//                     <li className="mb-4">
//                         <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//                             Projekttabelle
//                         </a>
//                     </li>
//                     <li className="mb-4">
//                         <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
//                             Meine Komponenten
//                         </a>
//                     </li>
//                 </ul>
//             </aside>
//         </>
//     );
// }

import React from 'react';
import layoutService from './../../utils/layoutServies';
import { useEffect, useState } from 'react';

export default function Sidebar() {

    const [isHoverState, setIsHoverState] = useState(false); // Steuert den Button-Hover
    const [isSidebarOpen, setIsSidebarOpen] = useState(layoutService.getSidebarState());
    const [isManualToggle, setIsManualToggle] = useState(false); // Steuert das manuelle Umschalten der Sidebar

    const toggleSidebar = () => {
        const sidebar: HTMLElement | null = document.getElementById('sidebar');
        setIsManualToggle(true); // Manuelles Umschalten aktivieren

        if (sidebar) {
            // Überprüfen, ob die Sidebar existiert, bevor darauf zugegriffen wird
            if (sidebar.classList.contains('w-16')) {
                sidebar.classList.remove('w-16');
                sidebar.classList.add('w-64');
                setIsHoverState(false);
            } else {
                sidebar.classList.remove('w-64');
                sidebar.classList.add('w-16');
                setIsHoverState(true);
            }
        } else {
            console.error('Sidebar element not found');
        }
    };

    useEffect(() => {
        layoutService.subscribe(setIsSidebarOpen);
        return () => {
            layoutService.unsubscribe(setIsSidebarOpen);
        };
    }, []);

    return (
        <>
        <aside
            id="sidebar"
            className={`${isSidebarOpen ? 'hidden' : 'flex'} group w-16 p-4 text-white h-screen bg-gray-800 transition-all duration-300 ease-in-out`}
            onMouseEnter={() => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) { // Überprüfe, ob sidebar nicht null ist
                    if (!isManualToggle && sidebar.classList.contains('w-16')) { // Nur umschalten, wenn nicht manuell
                        sidebar.classList.remove('w-16');
                        sidebar.classList.add('w-64');
                    }
                } else {
                    console.error('Sidebar element not found');
                }
            }}
            onMouseLeave={() => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) { // Überprüfe, ob sidebar existiert
                    if (!isManualToggle && sidebar.classList.contains('w-64')) { // Nur zurückschalten, wenn nicht manuell
                        sidebar.classList.remove('w-64');
                        sidebar.classList.add('w-16');
                    }
                } else {
                    console.error('Sidebar element not found');
                }
            }}
        >

            <ul>
                <div className="flex">
                    <button
                        onClick={toggleSidebar}
                        onMouseEnter={() => setIsHoverState(true)}  // Button-Hover aktivieren
                        onMouseLeave={() => setIsHoverState(false)} // Button-Hover deaktivieren
                        className={`${isHoverState ? 'bg-blue-500' : 'bg-gray-300'} relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 focus:outline-none`}
                    >
                        <span className={`${isHoverState ? 'translate-x-8' : 'translate-x-1'} inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300`} />
                    </button>
                </div>
                <li className="mb-4">
                    <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
                        Meine Komponenten
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
                        Home
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
                        Eigene Projekte
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
                        Kontakt
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
                        Projekttabelle
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/" className={`ml-2 ${isHoverState ? 'hidden' : 'block'} group-hover:block transition-all duration-300`}>
                        Meine Komponenten
                    </a>
                </li>
            </ul>
        </aside>
        </>
    );
}