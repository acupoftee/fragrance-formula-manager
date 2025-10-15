import DataTable, { Alignment, type TableColumn } from 'react-data-table-component';
import type { Formula, Material } from '../../types';
import { useFormulas } from '../../hooks/useFormulas';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { useMemo, useState } from 'react';
import MaterialTable from '../MaterialTable/MaterialTable';
import { formatCost } from '../../utils/formatters';
import { Box, Link } from '@mui/material';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import ActionMenu from './ActionMenu';

const columns: TableColumn<Formula>[] = [
    {
        name: 'Name',
        selector: (row: Formula) => row.name,
        sortable: true
    },
    {
        name: 'Creator',
        selector: (row: Formula) => row.creator,
        sortable: true
    },
    {
        name: 'Category',
        selector: (row: Formula) => row.category,
        sortable: true
    },
    {
        name: 'Cost ($)',
        selector: (row: Formula) => formatCost(row.materials.reduce((acc: number, material: Material) => acc + Number(material.cost), 0)),
        sortable: true,
    },
    {
        name: 'Date Added',
        selector: (row: Formula) => row.creationDate,
        sortable: true
    },
    {
        name: 'Notes',
        selector: (row: Formula) => row.notes,
        sortable: true,
        minWidth: '30%'
    },
    {
		cell: row => <ActionMenu row={row} />,
		width: '64px',
	},
];

const custmoStyles = {
    table: {
        style: {
            border: '1px solid rgba(0, 0, 0, 0.1)',
        }
    },
    subHeader: {
        style: {
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: 'none'
        }
    }
}
const FormulaTable = () => {
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const data: Formula[] = useFormulas();

    const filteredItems = useMemo(() => {
        let filteredItems: Formula[] = data;
        if (category) {
            filteredItems = filteredItems.filter((formula: Formula) => formula.category.toLowerCase() === category)
        }
        if (filter) {
            const lowercaseFilter = filter.toLowerCase();
            filteredItems = filteredItems.filter((formula: Formula) => formula.name.toLowerCase().includes(lowercaseFilter) || formula.notes.toLowerCase().includes(lowercaseFilter));
        }
        return filteredItems;
    }, [data, category, filter]);

    const handleSearchChange = (updated: string): void => setFilter(updated);
    const handleCategoryChange = (updated: string): void => setCategory(updated);

    const subHeaderComponentMemo = useMemo(() => {
            const handleClear = (): void => {
                if (filter) {
                    setFilter('');
                }
                if (category) {
                    setCategory('');
                }
            }
            return (
                <Box flexDirection="row">
                    <SearchFilter filterText={filter} onChange={handleSearchChange} onClick={handleClear}/>
                    <CategoryFilter category={category} onChange={handleCategoryChange} />
                    {(filter || category) && <Link sx={{ m: 1, cursor: 'pointer', textDecoration: 'none' }} onClick={handleClear}>Clear</Link>}
                </Box>
            );
    }, [filter, category]);

    return (
    <DataTable 
        columns={columns}
        data={filteredItems}
        subHeader
        subHeaderComponent={
            subHeaderComponentMemo
        }
        subHeaderAlign={Alignment.LEFT}
        expandableRows
        expandableRowsComponent={MaterialTable}
        customStyles={custmoStyles}
    />
    )
}


export default FormulaTable;