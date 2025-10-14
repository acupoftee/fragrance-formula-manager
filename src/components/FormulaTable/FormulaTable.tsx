import DataTable, { type TableColumn } from 'react-data-table-component';
import type { Formula } from '../../types';
import { useFormulas } from '../../hooks/useFormulas';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { useMemo, useState } from 'react';

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
        name: 'Date Added',
        selector: (row: Formula) => row.creationDate,
        sortable: true
    },
    {
        name: 'Notes',
        selector: (row: Formula) => row.notes,
        sortable: true
    },
];

const FormulaTable = () => {
    const [filter, setFilter] = useState('');
    const data: Formula[] = useFormulas();

    const filteredItems = data.filter((formula: Formula) => {
        const lowercaseFilter = filter.toLowerCase();
        return formula.name.toLowerCase().includes(lowercaseFilter) || formula.notes.toLowerCase().includes(lowercaseFilter);
    });

    const subHeaderComponentMemo = useMemo(() => {
            const handleChange = (updated: string): void => setFilter(updated)
            const handleClear = (): void => {
                if (filter) {
                    setFilter('');
                }
            }

            return (<SearchFilter filterText={filter} onChange={handleChange} onClick={handleClear}/>);
    }, [filter])

    return (
        <>
            <DataTable 
                columns={columns}
                data={filteredItems}
                subHeader
                subHeaderComponent={
                    subHeaderComponentMemo
                }
            />
        </>
    )
}


export default FormulaTable;