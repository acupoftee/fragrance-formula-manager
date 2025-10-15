import DataTable, { Alignment, type TableColumn } from 'react-data-table-component';
import type { Formula, Material } from '../../types';
import { useFormulas } from '../../hooks/useFormulas';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { useCallback, useMemo, useState } from 'react';
import MaterialTable from '../MaterialTable/MaterialTable';
import { formatCost } from '../../utils/formatters';
import { Box, Button, Link, Modal } from '@mui/material';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import ActionMenu from './ActionMenu';
import { Comparisons } from '../Comparison/Comparison';

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
        selector: (row: Formula) => formatCost(row.totalCost),
        sortable: true,
        sortFunction: (a: Formula, b: Formula) => b.totalCost - a.totalCost
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #00000079',
  boxShadow: 24,
  p: 4,
};

const FormulaTable = () => {
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Formula[]>([]);
    
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
    const handleSelectedRows = useCallback(({ selectedRows }: { selectedRows: Formula[] }) => setSelectedRows(selectedRows), []);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

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
                <Box flexDirection="row" width="100%">
                    <SearchFilter filterText={filter} onChange={handleSearchChange} onClick={handleClear}/>
                    <CategoryFilter category={category} onChange={handleCategoryChange} />
                    {(filter || category) && <Link sx={{ m: 1, cursor: 'pointer', textDecoration: 'none' }} onClick={handleClear}>Clear</Link>}
                    <Button color="primary" onClick={handleOpen} disabled={selectedRows.length < 2}>Compare</Button>
                </Box>
            );
    }, [filter, category, selectedRows.length]);

    return (
        <>
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
                selectableRows
                onSelectedRowsChange={handleSelectedRows}
            />
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2>Formula Comparisons</h2>
                    <Comparisons formulas={selectedRows} />
                </Box>
            </Modal>
        </>
    )
}


export default FormulaTable;