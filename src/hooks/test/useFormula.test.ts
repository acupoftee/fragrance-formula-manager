import { test, expect } from "vitest";
import { useFormulas } from "../useFormulas";
import type { Formula, Material } from "../../types";

test("`useFormulas` loads 6 differnet formula entries", () => {
  expect(useFormulas().length).toBe(6);
});

// This means we've appropriately separated all materials
test("`useFormula` entry material costs add up to 100", () => {
  const actual = useFormulas();

  const sums = actual.map((formula: Formula) => {
    return formula.materials.reduce((acc: number, material: Material) => {
      return acc + Number(material.percentage);
    }, 0);
  });

  const isTruthy = sums.every((sum: number) => sum === 100);

  expect(isTruthy).toBeTruthy();
});
