import ConsultaPanel from "@/components/consultaPanel";
import IdiomaSelector from "@/components/idiomaSelector";
import PreguntasPanel from "@/components/preguntasPanel";
import DatasetSelector from "@/components/datasetSelector";
import { ThemeSwitch } from "@/components/theme-switch";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function IndexPage() {
  const [consulta, setConsulta] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [dataset, setDataset] = useState("bebidas");
  const { t } = useTranslation();

  const ontologias = [
    { code: "bebidas", label: "Bebidas Bolivia" },
    { code: "wine", label: "Wine Ontology" },
    { code: "beer", label: "Beer Ontology" },
    { code: "dbpedia", label: "DBpedia" },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">{t("appTitle")}</h1>
            <ThemeSwitch />
          </div>

          <p className="text-gray-600 mb-6 text-center md:text-left">
            {t("appDescription")}
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <IdiomaSelector />
          </div>
        </div>

        {/* Selector de dataset */}
        <div className="w-full max-w-6xl mt-6">
          <DatasetSelector
            datasets={ontologias}
            onSelect={setDataset}
            initialDataset="bebidas"
          />
        </div>

        {/* Paneles que dependen del dataset */}
        <div className="w-full max-w-6xl mt-8">
          <PreguntasPanel dataset={dataset} setConsulta={setConsulta} />
          <ConsultaPanel
            consulta={consulta}
            setConsulta={setConsulta}
            showEditor={showEditor}
            dataset={dataset}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
