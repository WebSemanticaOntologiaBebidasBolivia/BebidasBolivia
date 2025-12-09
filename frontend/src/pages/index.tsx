import ConsultaPanel from "@/components/consultaPanel";
import IdiomaSelector from "@/components/idiomaSelector";
import PreguntasPanel from "@/components/preguntasPanel";
import { ThemeSwitch } from "@/components/theme-switch";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function IndexPage() {
  const [consulta, setConsulta] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
            <Button onPress={onOpen} color="primary">
              {t("verPreguntas")}
            </Button>
          </div>
        </div>

        <div className="w-full max-w-6xl mt-8">
          <ConsultaPanel consulta={consulta} setConsulta={setConsulta} />
        </div>
      </section>

      {/* Drawer para Preguntas */}
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} placement="right" hideCloseButton>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex items-center justify-between">
                <span className="text-xl font-semibold">
                  {t("verPreguntas")}
                </span>
                <Button color="danger" variant="light" onPress={onClose}>
                  ✕ {t("cerrar")}
                </Button>
              </DrawerHeader>
              <DrawerBody>
                <PreguntasPanel setConsulta={setConsulta} />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </DefaultLayout>
  );
}
