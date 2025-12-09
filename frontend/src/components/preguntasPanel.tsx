import { Accordion, AccordionItem } from "@heroui/accordion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

interface PreguntasPanelProps {
  setConsulta: (q: string) => void;
}

type Idioma = "es" | "en" | "fr" | "pt" | "it";

interface Pregunta {
  id: string;
  label: Record<Idioma, string>;
  query: string;
}

export default function PreguntasPanel({ setConsulta }: PreguntasPanelProps) {
  const { i18n, t } = useTranslation();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL as string;
    const API_PREGUNTAS = import.meta.env.VITE_API_PREGUNTAS as string;

    axios
      .get(`${API_URL}${API_PREGUNTAS}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.preguntas;
        setPreguntas(data || []);
      })
      .catch((err) => {
        console.error("❌ Error cargando preguntas:", err);
      });
  }, []);

  return (
    <div className="overflow-y-auto" style={{ scrollbarGutter: "stable" }}>
      <Accordion variant="splitted">
        {preguntas.map((p) => {
          const idiomaActual: Idioma = (i18n.language as Idioma) || "es";
          const titulo = p.label[idiomaActual] || p.label["es"];

          return (
            <AccordionItem
              key={p.id}
              aria-label={titulo}
              title={titulo}
              onPress={() => setConsulta(p.query)}
            >
              <p className="text-gray-600">{t("panelHint")}</p>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
