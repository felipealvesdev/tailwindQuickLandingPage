import { createContext, ReactNode, useEffect, useState } from "react";

export interface ThemeContextProps {
    toggleTheme: ()=>void
    theme: string
}

export const ThemeContext = createContext({} as ThemeContextProps)

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('theme') || 'light';
        }
        return 'light';
      });
    
      // Alterar o tema e armazenar no localStorage
      const toggleTheme = () => {
        setTheme((prevTheme) => {
          const newTheme = prevTheme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);  // Armazenar no localStorage
          return newTheme;
        });
      };
    
      // Adicionar/remover classes de tema no body
      useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      }, [theme]);
    
    return <ThemeContext.Provider value={{toggleTheme, theme}}>
        {children}
    </ThemeContext.Provider>
}