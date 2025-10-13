export type Category = "Fresh" | "Floral" | "Woody" | "Oriental";

export type MaterialNote =
  | "Top Note"
  | "Middle Note"
  | "Bottom Note"
  | "Base Note";

export type Material = {
  name: string;
  quantity: number;
  percentage: number;
  cost: number;
  supplier: string;
  materialNotes: string;
};

export type Formula = {
  id: number;
  name: string;
  creator: string;
  category: Category;
  creationDate: Date;
  materials: Material[];
};
