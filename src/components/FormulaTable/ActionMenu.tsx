import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Box } from '@mui/material';
import type { Formula } from '../../types';
import { exportCSV } from '../../utils/exportCSV';
import { exportPDF } from '../../utils/exportPDF';

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
    exportCSV(row);
    handleClose();
  }
  const handleExportPDF = () => {
    exportPDF(row);
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