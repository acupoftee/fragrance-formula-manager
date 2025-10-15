import { Box } from "@mui/material";
import type { Formula, Material } from "../../types"
import { formatCost } from "../../utils/formatters"
import type { JSX } from "react";

export const Comparisons = ({ formulas }: { formulas: Formula[] }) => {
    // 1. Show cheapest fragrance
    const fragranceCosts: JSX.Element[] = formulas.sort((a: Formula, b: Formula) => a.totalCost - b.totalCost).map((formula: Formula, index: number) => {
        return (<li key={formula.id} style={{ color: index === 0 ? '#357a38': 'black'}}>
            <b>{formula.name}</b>: {formatCost(formula.totalCost)} with <b>{formula.materials.length}</b> total materials
        </li>)
    });


    // 2. Show most expensive ingredients
    const getMostExpensiveIngredient = (materials: Material[]) => Math.max(...materials.map((material: Material) => Number(material.cost) * Number(material.quantity)))
    const mostExpensiveIngredients: JSX.Element[] = formulas.sort((a: Formula, b: Formula) => getMostExpensiveIngredient(b.materials) - getMostExpensiveIngredient(a.materials)).map((formula: Formula, index: number) => {
        const material = formula.materials.sort((a: Material, b: Material) => (Number(b.cost) * Number(b.quantity)) - (Number(a.cost) * Number(a.quantity)))[0];
        return (<li key={formula.id} style={{ color: index === 0 ? '#f44336': 'black'}}>
            {formula.name}: <b>{material.name}</b> costing <b>{formatCost(Number(material.cost) * Number(material.quantity))}</b> for {Math.floor(material?.quantity)} ml.
        </li>)
    });

    return (
        <Box>
            <h4>Formula Costs</h4>
            <ol>{fragranceCosts}</ol>
            <br></br>
            <h4>Most Expensive Ingredient in each Formula</h4>
            <ol>{mostExpensiveIngredients}</ol>
        </Box>
        
    )
}