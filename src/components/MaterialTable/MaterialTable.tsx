import DataTable, { type TableColumn, type ExpanderComponentProps } from 'react-data-table-component';
import type { Formula, Material } from '../../types';
import { Box } from '@mui/material';
import { formatCost, formatPercentage } from '../../utils/formatters';


const columns: TableColumn<Material>[] = [
    {
        name: 'Name',
        selector: (row: Material) => row.name,
        sortable: true,
    },
    {
        name: 'Type',
        selector: (row: Material) => row.materialType,
        sortable: true,
    },
    {
        name: 'Quantity (ml)',
        selector: (row: Material) => row.quantity,
        sortable: true

    },
    {
        name: 'Percentage',
        selector: (row: Material) => formatPercentage(row.percentage),
        sortable: true,
    },
    {
        name: 'Cost per ml ($)',
        selector: (row: Material) => formatCost(row.cost),
        sortable: true
    },
    {
        name: 'Supplier',
        selector: (row: Material) => row.supplier,
        sortable: true
    },
    {
        name: 'Material Notes',
        selector: (row: Material) => row.materialNotes,
        sortable: true,
        minWidth: '25%'
    },
];


const customStyles = {
    table: {
        style: {
            border: '.05em solid rgba(192, 192, 192, 1)',
        }
    },
	headRow: {
		style: {
            backgroundColor: 'rgba(199, 199, 199, 1)',
            minHeight: '30px'

		},
	},
	headCells: {
		style: {
			color: '#202124',
		},
	},
	rows: {
		style: {
            minHeight: '30px'
		},
	},
};
const MaterialTable: React.FC<ExpanderComponentProps<Formula>> = ({ data }) => {
    return (
        <Box justifyContent="flex-start" paddingX="64px" paddingTop="4px" paddingBottom="32px" textAlign="left" borderBottom="1px solid rgba(0, 0, 0, .12)">
            <h5>{data.name} Materials</h5>
            <DataTable 
                columns={columns}
                data={data.materials}
                customStyles={customStyles}
            />
        </Box>
    )
}


export default MaterialTable;