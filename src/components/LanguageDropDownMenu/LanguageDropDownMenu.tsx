import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import useTranslation from "@/hooks/useTranslation";
import { Languages } from "lucide-react";

function LanguageDropDownMenu() {
  const { language, switchLanguage } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Languages className="text-gray-50 dark:text-gray-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {language === "pt-BR" ? "Selecione o idioma" : "Select language"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => switchLanguage(value as "pt-BR" | "en-US")}
        >
          <DropdownMenuRadioItem value="pt-BR">Português</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en-US">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageDropDownMenu;
