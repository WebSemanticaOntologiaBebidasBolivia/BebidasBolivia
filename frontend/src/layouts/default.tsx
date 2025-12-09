import { Link } from "@heroui/link";
import { useTranslation } from "react-i18next";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Contenido principal */}
      <main className="container mx-auto max-w-7xl px-6 flex-grow py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-default-600">{t("footer.repo")}:</span>
          <Link
            isExternal
            className="text-primary font-medium"
            href="https://github.com/WebSemanticaOntologiaBebidasBolivia/BebidasBolivia"
            title="GitHub Grupo 20 - Bebidas"
          >
            github.com/grupo20-bebidas
          </Link>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          © 2025 Grupo 20 - Bebidas. {t("footer.rights")}
        </p>
      </footer>
    </div>
  );
}
