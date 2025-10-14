import type { CSVData, Formula } from "../types";
import { readData } from "../utils/readData";

export const useFormulas = (): Formula[] => {
  const csvData: CSVData[] = readData();

  const entries: { [key: string]: Formula } = {};

  for (const row of csvData) {
    if (!entries[row.formula_id]) {
      entries[row.formula_id] = {
        id: row.formula_id,
        name: row.formula_name,
        creator: row.creator,
        creationDate: row.creation_date,
        category: row.category,
        notes: row.notes,
        materials: [],
      };
    }

    entries[row.formula_id].materials.push({
      name: row.material_name,
      quantity: row.quantity_ml,
      percentage: row.percentage,
      cost: row.cost_per_ml,
      supplier: row.supplier,
      materialNotes: row.material_notes,
    });
  }

  const formattedEntries: Formula[] = Object.values(entries);

  return formattedEntries;
};
