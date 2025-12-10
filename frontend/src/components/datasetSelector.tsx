import { useState } from "react";
import { Button } from "@heroui/button";

interface DatasetSelectorProps {
  datasets: { code: string; label: string }[];
  onSelect: (dataset: string) => void;
  initialDataset?: string;
}

export default function DatasetSelector({
  datasets,
  onSelect,
  initialDataset = "bebidas",
}: DatasetSelectorProps) {
  const [selected, setSelected] = useState(initialDataset);

  const handleSelect = (code: string) => {
    setSelected(code);
    onSelect(code); // notifica al padre
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {datasets.map((ds) => (
        <Button
          key={ds.code}
          onClick={() => handleSelect(ds.code)}
          color={selected === ds.code ? "success" : "primary"}
          variant={selected === ds.code ? "solid" : "bordered"}
          radius="full"
        >
          {ds.label}
        </Button>
      ))}
    </div>
  );
}
