import type { Formula, Material } from "../types";

export const createCSV = (formula: Formula): string => {
  const csvHeaders = [
    "formula_id",
    "formula_name",
    "creator",
    "category",
    "creation_date",
    "notes",
    "material_name",
    "material_type",
    "quantity_ml",
    "percentage",
    "cost_per_ml",
    "supplier",
    "material_notes",
  ];

  const rows: string[][] = formula.materials.map((material: Material) => [
    formula.id,
    formula.name,
    formula.creator,
    String(formula.category),
    formula.creationDate,
    formula.notes,
    material.name,
    String(material.materialType),
    String(material.quantity),
    String(material.percentage),
    String(material.cost),
    material.supplier,
    material.materialNotes,
  ]);

  const csvString: string = [csvHeaders, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  return csvString;
};
