import {
  TranslationContext,
  TranslationContextProps,
} from "@/context/translation-context";
import { useContext } from "react";

export default function useTranslation(): TranslationContextProps {
  const context = useContext(TranslationContext);
  return context;
}
