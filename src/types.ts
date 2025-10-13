export type Category = "Fresh" | "Floral" | "Woody" | "Oriental";

export type MaterialNote =
  | "Top Note"
  | "Middle Note"
  | "Bottom Note"
  | "Base Note";

export type CSVData = {
  formula_id: string;
  formula_name: string;
  creator: string;
  category: Category;
  creation_date: string;
  notes: string;
  material_name: string;
  material_type: string;
  quantity_ml: number;
  percentage: number;
  cost_per_ml: number;
  supplier: string;
  material_notes: string;
};

export type Material = {
  name: string;
  quantity: number;
  percentage: number;
  cost: number;
  supplier: string;
  materialNotes: string;
};

export type Formula = {
  id: string;
  name: string;
  creator: string;
  category: Category;
  creationDate: Date;
  materials: Material[];
};
