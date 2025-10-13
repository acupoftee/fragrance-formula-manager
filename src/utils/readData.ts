import Papa from "papaparse";
import type { CSVData } from "../types";
import { csv } from "./interview.csv";

export const readData = (): CSVData[] => {
  const content = Papa.parse<CSVData>(csv, { header: true });

  return content.data;
};
