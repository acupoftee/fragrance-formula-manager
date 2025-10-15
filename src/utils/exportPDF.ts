import jsPDF from "jspdf";
import type { Formula, Material } from "../types";
import { formatCost } from "./formatters";
import autoTable from "jspdf-autotable";

export const exportPDF = (formula: Formula): void => {
  const pdf = new jsPDF("portrait", "pt", "A4");
  const head: string[][] = [
    [
      "Name",
      "Type",
      "Quantity (ml)",
      "Percentage",
      "Cost per ml ($)",
      "Supplier",
      "Material Notes",
    ],
  ];
  const body = formula.materials.map((material: Material) => [
    material.name,
    material.materialType,
    material.quantity,
    material.percentage,
    material.cost,
    material.supplier,
    material.materialNotes,
  ]);

  pdf.setFontSize(15);
  pdf.text(formula.name, 40, 40);

  pdf.setFontSize(10);
  pdf.text(`Created by: ${formula.creator}`, 40, 60);
  pdf.text(`Formula Category: ${formula.category}`, 40, 74);

  const cost = formatCost(
    formula.materials.reduce(
      (acc: number, material: Material) => acc + Number(material.cost),
      0
    )
  );
  pdf.text(`Total Material Cost: ${cost}`, 40, 88);
  pdf.text(formula.notes, 40, 110);

  pdf.setFontSize(12);
  pdf.text("Materials", 40, 140);

  autoTable(pdf, {
    startY: 150,
    head,
    body,
  });

  pdf.save(`${formula.id}.pdf`);
};
