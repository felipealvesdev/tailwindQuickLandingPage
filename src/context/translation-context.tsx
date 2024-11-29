import { createContext, ReactNode, useEffect, useState } from "react";

export interface TranslationContextProps {
  language: "pt-BR" | "en-US";
  switchLanguage: (language: "pt-BR" | "en-US") => void;
}

export const TranslationContext = createContext({} as TranslationContextProps);

export function TranslationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<"pt-BR" | "en-US">("pt-BR");

  const switchLanguage = (language: "pt-BR" | "en-US") => {
    localStorage.setItem("language", language);
    setLanguage(language);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (!storedLanguage || storedLanguage === null) {
      localStorage.setItem("language", "pt-BR");
      setLanguage("pt-BR");
    }

    setLanguage(storedLanguage as "pt-BR" | "en-US");
  }, [language]);
  return (
    <TranslationContext.Provider value={{ language, switchLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}
