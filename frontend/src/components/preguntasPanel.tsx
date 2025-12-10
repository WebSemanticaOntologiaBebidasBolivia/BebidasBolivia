import { Accordion, AccordionItem } from "@heroui/accordion";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "@heroui/button";

interface PreguntasPanelProps {
  setConsulta: (q: string) => void;
  dataset: string; // 👈 nuevo prop
}

type Idioma = "es" | "en" | "fr" | "pt" | "it";

interface Pregunta {
  id: string;
  label: Record<Idioma, string>;
  query: string;
}

export default function PreguntasPanel({
  setConsulta,
  dataset,
}: PreguntasPanelProps) {
  const { i18n, t } = useTranslation();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 5]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL as string;

    axios
      .get(`${API_URL}/api/preguntas/${dataset}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.preguntas;
        setPreguntas(data || []);
        setSelectedId(null);
        setCurrentIndex(0);
      })
      .catch((err) => {
        console.error("❌ Error cargando preguntas:", err);
      });
  }, [dataset]); // 👈 recarga cuando cambia dataset

  // Ajustar rango visible según ancho de pantalla
  useEffect(() => {
    const updateRange = () => {
      const width = window.innerWidth;
      if (width < 480) setVisibleRange([0, 3]);
      else if (width < 768) setVisibleRange([0, 5]);
      else setVisibleRange([0, preguntas.length]);
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, [preguntas.length]);

  const goToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
    }
    setCurrentIndex(index);

    const [start, end] = visibleRange;
    const windowSize = end - start;
    if (index < start) {
      setVisibleRange([index, index + windowSize]);
    } else if (index >= end) {
      setVisibleRange([index - windowSize + 1, index + 1]);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) goToIndex(currentIndex - 1);
  };

  const scrollRight = () => {
    if (currentIndex < preguntas.length - 1) goToIndex(currentIndex + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={scrollRef}
        className="overflow-x-hidden flex w-full"
        style={{ scrollbarGutter: "stable" }}
      >
        {preguntas.map((p) => {
          const idiomaActual: Idioma = (i18n.language as Idioma) || "es";
          const titulo = p.label[idiomaActual] || p.label["es"];
          const isSelected = selectedId === p.id;

          return (
            <div key={p.id} className="w-full flex-shrink-0 px-2">
              <Accordion variant="splitted">
                <AccordionItem
                  aria-label={titulo}
                  title={titulo}
                  onPress={() => {
                    setConsulta(p.query);
                    setSelectedId(p.id);
                  }}
                  classNames={{
                    base: `rounded-lg p-4 transition-colors duration-300 ${
                      isSelected
                        ? "bg-success-100 border border-success"
                        : "bg-content1"
                    } hover:bg-content2`,
                    title: "text-lg font-semibold",
                    trigger: "hover:bg-content2",
                  }}
                >
                  <p className="text-default-500">{t("panelHint")}</p>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <Button
          onPress={scrollLeft}
          variant="bordered"
          radius="full"
          isDisabled={currentIndex === 0}
        >
          ◀
        </Button>

        <div className="flex gap-2">
          {preguntas.slice(visibleRange[0], visibleRange[1]).map((_, idx) => {
            const realIndex = visibleRange[0] + idx;
            return (
              <button
                key={realIndex}
                onClick={() => goToIndex(realIndex)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === realIndex ? "bg-success" : "bg-default-300"
                }`}
              />
            );
          })}
        </div>

        <Button
          onPress={scrollRight}
          variant="bordered"
          radius="full"
          isDisabled={currentIndex === preguntas.length - 1}
        >
          ▶
        </Button>
      </div>
    </div>
  );
}
