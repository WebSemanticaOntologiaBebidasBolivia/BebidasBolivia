import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

interface ConsultaPanelProps {
  consulta: string;
  setConsulta: (q: string) => void;
}

export default function ConsultaPanel({
  consulta,
  setConsulta,
}: ConsultaPanelProps) {
  const { t } = useTranslation();
  const [resultado, setResultado] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const API_CONSULTAR = import.meta.env.VITE_API_CONSULTAR;

  const ejecutarConsulta = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}${API_CONSULTAR}`, {
        query: consulta,
      });
      setResultado(response.data.results.bindings);
    } catch (error) {
      console.error("Error al consultar:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabla = () => {
    if (!resultado || resultado.length === 0) {
      return <p className="text-gray-500">{t("noResults")}</p>;
    }

    const columnas = Object.keys(resultado[0]);

    return (
      <Table aria-label={t("tableLabel")} className="mt-4">
        <TableHeader>
          {columnas.map((col) => (
            <TableColumn key={col}>{col}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {resultado.map((fila, idx) => (
            <TableRow key={idx}>
              {columnas.map((col) => (
                <TableCell key={col}>{fila[col]?.value || ""}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder={t("inputPlaceholder")}
        minRows={10}
      />
      <Button
        onClick={ejecutarConsulta}
        color="primary"
        variant="solid"
        isLoading={loading}
      >
        {t("executeButton")}
      </Button>
      <div className="overflow-auto max-h-96">{renderTabla()}</div>
    </div>
  );
}
