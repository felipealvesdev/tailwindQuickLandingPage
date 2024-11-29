import { ThemeContextProvider } from "@/context/theme-context";
import { TranslationContextProvider } from "@/context/translation-context";
import { ReactNode } from "react";

function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <TranslationContextProvider>{children}</TranslationContextProvider>
    </ThemeContextProvider>
  );
}

export default AppProvider;
