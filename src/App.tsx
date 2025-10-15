import "./App.css";
import FormulaTable from "./components/FormulaTable/FormulaTable";

function App() {
  return (
    <div>
      <h3>Osmo Fragrance Formula Manager</h3>
      <p>Select two or more rows to compare material costs.</p>
      <FormulaTable />
    </div>
  );
}

export default App;
