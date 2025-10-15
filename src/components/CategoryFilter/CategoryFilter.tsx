import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CategoryFilter = ({
  category,
  onChange,
}: {
  category: string;
  onChange: (updated: string) => void;
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="category-filter-label">Category</InputLabel>
      <Select
        labelId="category-filter-label"
        id="category-filter"
        value={category}
        label="Category"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="fresh">Fresh</MenuItem>
        <MenuItem value="floral">Floral</MenuItem>
        <MenuItem value="woody">Woody</MenuItem>
        <MenuItem value="oriental">Oriental</MenuItem>
      </Select>
    </FormControl>
  );
};
