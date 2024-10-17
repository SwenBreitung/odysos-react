"use client";
import React, { createContext, useContext, useState } from 'react';

interface LayoutContextProps {
  toggleSidebarSize: () => void;
  toggleSidebarVisibility: () => void;
  isSidebarExpanded: boolean;
  isSidebarVisible: boolean;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  // Schaltet zwischen groß und klein
  const toggleSidebarSize = () => {
    setSidebarExpanded(prevState => !prevState);
    console.log('LayoutService: Sidebar size toggled, isSidebarExpanded:', !isSidebarExpanded);
  };

  // Schaltet die Sichtbarkeit der Sidebar
  const toggleSidebarVisibility = () => {
    setSidebarVisible(prevState => !prevState);
    console.log('LayoutService: Sidebar visibility toggled, isSidebarVisible:', !isSidebarVisible);
  };

  return (
    <LayoutContext.Provider
      value={{
        toggleSidebarSize,
        toggleSidebarVisibility,
        isSidebarExpanded,
        isSidebarVisible,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};



// let sidebarState = false;

// const layoutService = {
//   toggleSidebar() {
//     sidebarState = !sidebarState; // Sidebar-Zustand wechseln
//     // Optional: Update-Listeners informieren (wie setState in der Komponente)
//   },

//   getSidebarState() {
//     return sidebarState;
//   },

//   subscribe(listener: Function) {
//     // Listener hinzufügen (setState-Funktion der Komponente)
//   },

//   unsubscribe(listener: Function) {
//     // Listener entfernen
//   },
// };

// export default layoutService;


// import { useState } from 'react';

// // Zustand für Sidebar und Hover
// const [sidebarState, setSidebarState] = useState<boolean>(false);
// const [isHoverState, setIsHoverState] = useState<boolean>(false);

// // Listener Liste (array of functions)
// const [listeners, setListeners] = useState<Array<(state: boolean) => void>>([]);

// /**
//  * Schaltet den Zustand der Sidebar um und informiert alle Listener.
//  */
// const toggleSidebar = () => {
//     const newState = !sidebarState;
//     setSidebarState(newState);
//     listeners.forEach((listener) => listener(newState));
// };

// /**
//  * Schaltet den Hover-Zustand der Sidebar um und informiert alle Listener.
//  */
// const toggleHoverSidebar = () => {
//     const newHoverState = !isHoverState;
//     setIsHoverState(newHoverState);
//     listeners.forEach((listener) => listener(newHoverState));
// };

// /**
//  * Gibt den aktuellen Zustand der Sidebar zurück.
//  */
// const getSidebarState = () => {
//     return sidebarState;
// };

// /**
//  * Gibt den aktuellen Hover-Zustand der Sidebar zurück.
//  */
// const getSidebarHoverState = () => {
//     return isHoverState;
// };

// /**
//  * Fügt einen Listener hinzu.
//  * @param listener Eine Funktion, die bei Änderungen des Sidebar-Zustands aufgerufen wird.
//  */
// const subscribe = (listener: (state: boolean) => void) => {
//     setListeners((prevListeners) => [...prevListeners, listener]);
// };

// /**
//  * Entfernt einen Listener.
//  * @param listener Die zu entfernende Listener-Funktion.
//  */
// const unsubscribe = (listener: (state: boolean) => void) => {
//     setListeners((prevListeners) =>
//         prevListeners.filter((l) => l !== listener)
//     );
// };

// const layoutService = {
//     toggleSidebar,
//     toggleHoverSidebar,
//     getSidebarState,
//     getSidebarHoverState,
//     subscribe,
//     unsubscribe,
// };

// export default layoutService;

