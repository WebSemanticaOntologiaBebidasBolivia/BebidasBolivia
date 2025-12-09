import { Button } from "@heroui/button";
import { useTranslation } from "react-i18next";

const idiomas = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
];

export default function IdiomaSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="flex justify-center gap-3">
      {idiomas.map((idioma) => (
        <Button
          key={idioma.code}
          onClick={() => i18n.changeLanguage(idioma.code)}
          color={i18n.language === idioma.code ? "success" : "primary"}
          variant={i18n.language === idioma.code ? "solid" : "bordered"}
          radius="full"
        >
          {idioma.label}
        </Button>
      ))}
    </div>
  );
}
