# OSMO Fragrance Manager (Technical Challenge)

Manages all created formulas to better understand formula breakdown, and the costs of each formula.

## Features

- Displays all formulas in a table with formula metadata
- Sorts all columns by headers
- Filter formula by name, notes, or fragrance category
- Shows complete formula breakdown when a row is clicked
- Shows all materials with their quantities
- Export formulas to CSV or PDF
- Compare the cost analysis of 2 or more formulas

\*No generative AI tools were used in the making of this project.

## Technical Approach

For every material included in a formula, the initial CSV file documented the formula metadata associated with each material (i.e. ID, formula, name, etc.). This means the data needed to be transformed in such a way where each formula stores a list of `Material` objects:

### Initial CSV Data for Ocean Breeze

```csv
formula_id,formula_name,creator,category,creation_date,notes,material_name,material_type,quantity_ml,percentage,cost_per_ml,supplier,material_notes
F001,Ocean Breeze,Sarah Chen,Fresh,2024-03-15,"Light aquatic fragrance perfect for summer wear",Bergamot Oil,Top Note,15.0,15.0,2.50,CitrusCore,Calabrian bergamot - very bright
F001,Ocean Breeze,Sarah Chen,Fresh,2024-03-15,"Light aquatic fragrance perfect for summer wear",Lemon Oil,Top Note,8.0,8.0,1.80,CitrusCore,Sicilian lemon - zesty opening
F001,Ocean Breeze,Sarah Chen,Fresh,2024-03-15,"Light aquatic fragrance perfect for summer wear",Marine Accord,Top Note,12.0,12.0,4.20,AquaScents,Synthetic sea breeze effect
```

### Transformed Ocean Breeze Formula

```json
{
  "id": "F001",
  "name": "Ocean Breeze",
  "creator": "Sarah Chen",
  "creationDate": "2024-03-15",
  "category": "Fresh",
  "notes": "Light aquatic fragrance perfect for summer wear",
  "totalCost": 331.1,
  "materials": [
    {
      "name": "Bergamot Oil",
      "materialType": "Top Note",
      "quantity": "15.0",
      "percentage": "15.0",
      "cost": "2.50",
      "supplier": "CitrusCore",
      "materialNotes": "Calabrian bergamot - very bright"
    }
    // ...
  ]
}
```

I used `papaparse` to read the CSV data in the client--I could easily manipulate the resulting object to fit into the `CSVData` type I created to understand the shape of the data. Then I implemented `useFormulas` to transform the data, and calculate the total cost of materials.

I used `react-data-table-component` which includes a plethora of features for an intiitive nested data viewing experience. It offers expandabe rows to view the formula breakdown, selectable rows for formula comparisons, column sorting functionality, and ease of accomodating subheader components such as the search filters and "Compare" button. Because the aforementioned component also used MaterialUI, I used the Material UI library for additional visual cohesion.

I've been itching to resume work with data exports, so I gleefully implemented the CSV and PDF exporting features! The PDF export used `jsPDF` and `jspdf-autotable` to maintain most of the visual experience. The CSV export creates a `Blob` with a CSV data transformation function ready for download.

- While we have the CSV data ready in the client, there is a chance that we're able to include data that was not in the original CSV file, like total cost of materials.

Lastly, I've developed the comparison feature with the following observations

- All of the materials appeared to be unique
- Given a unique list of materials, we could potentially consider evalating financial trade offs to specific materials

I calcualted the most expensive material in the Comparison component, and then opted to show the results in a modal once 2 or more materials are selected.

### Technical Tradeoffs

Currently, the data is read each time on load
