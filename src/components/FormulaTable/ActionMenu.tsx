import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Box } from '@mui/material';
import type { Formula, Material } from '../../types';
import { createCSV } from '../../utils/createCSV';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import { formatCost } from '../../utils/formatters';

export default function ActionMenu({ row }: {row: Formula}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCSVExport = () => {
    const csvString = createCSV(row);

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${row.id}.csv`;
    document.body.appendChild(link);

    // Simulate a click
    link.click();

    // Remove link and reference
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    handleClose();
  }

  const handleExportPDF = () => {
    const pdf = new jsPDF("portrait", "pt", "A4");
    const head: string[][] = [[    
            'Name','Type',
            'Quantity (ml)',
            'Percentage',
            'Cost per ml ($)',
            'Supplier',
            'Material Notes']];
    const body = row.materials.map((material: Material) => [material.name, material.materialType, material.quantity, material.percentage, material.cost, material.supplier, material.materialNotes]);
    
    pdf.setFontSize(15);
    pdf.text(row.name, 40, 40);
    
    pdf.setFontSize(10);
    pdf.text(`Created by: ${row.creator}`, 40, 60);
    pdf.text(`Formula Category: ${row.category}`, 40, 74);

    const cost = formatCost(row.materials.reduce((acc: number, material: Material) => acc + Number(material.cost), 0));
    pdf.text(`Total Material Cost: ${cost}`,  40, 88);
    pdf.text(row.notes,  40, 110);

    pdf.setFontSize(12);
    pdf.text('Materials',  40, 140);

    autoTable(pdf, {
        startY: 150,
        head,
        body
    });

    pdf.save(`${row.id}.pdf`);
    handleClose();
  }

  return (
    <Box key={row.id}>
      <IconButton
        aria-label="more"
        id="action-button"
        aria-controls={open ? 'action-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
        onMouseUp={(e) => e.preventDefault()}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem key="csv" onClick={handleCSVExport}>
            Export to CSV
        </MenuItem>
        <MenuItem key="pdf" onClick={handleExportPDF}>
            Export to PDF
        </MenuItem>
      </Menu>
    </Box>
  );
}