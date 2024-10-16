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


import { useState } from 'react';

const useLayoutService = () => {
    // Zustand für Sidebar und Hover
    const [sidebarState, setSidebarState] = useState<boolean>(false);
    const [isHoverState, setIsHoverState] = useState<boolean>(false);

    // Listener Liste (array of functions)
    const [listeners, setListeners] = useState<Array<(state: boolean) => void>>([]);

    /**
     * Schaltet den Zustand der Sidebar um und informiert alle Listener.
     */
    const toggleSidebar = () => {
        const newState = !sidebarState;
        setSidebarState(newState);
        listeners.forEach((listener) => listener(newState));
    };

    /**
     * Schaltet den Hover-Zustand der Sidebar um und informiert alle Listener.
     */
    const toggleHoverSidebar = () => {
        const newHoverState = !isHoverState;
        setIsHoverState(newHoverState);
        listeners.forEach((listener) => listener(newHoverState));
    };

    /**
     * Gibt den aktuellen Zustand der Sidebar zurück.
     */
    const getSidebarState = () => {
        return sidebarState;
    };

    /**
     * Gibt den aktuellen Hover-Zustand der Sidebar zurück.
     */
    const getSidebarHoverState = () => {
        return isHoverState;
    };

    /**
     * Fügt einen Listener hinzu.
     * @param listener Eine Funktion, die bei Änderungen des Sidebar-Zustands aufgerufen wird.
     */
    const subscribe = (listener: (state: boolean) => void) => {
        setListeners((prevListeners) => [...prevListeners, listener]);
    };

    /**
     * Entfernt einen Listener.
     * @param listener Die zu entfernende Listener-Funktion.
     */
    const unsubscribe = (listener: (state: boolean) => void) => {
        setListeners((prevListeners) =>
            prevListeners.filter((l) => l !== listener)
        );
    };

    return {
        toggleSidebar,
        toggleHoverSidebar,
        getSidebarState,
        getSidebarHoverState,
        subscribe,
        unsubscribe,
    };
};

export default useLayoutService;