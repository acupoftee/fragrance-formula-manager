import { test, expect } from "vitest";
import { readData } from "../readData";

test("`readData` loads all 47 formula entries", () => {
  expect(readData().length).toBe(47);
});
