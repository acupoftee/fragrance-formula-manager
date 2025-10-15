import { IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';

export const SearchFilter = ({ filterText, onChange, onClick }: { filterText: string, onChange: (updated: string) => void, onClick: () => void }) => {
    return (
        <OutlinedInput
            sx={{ m: 1, minWidth: 250 }} 
            value={filterText}
            size='small'
            onChange={(e) => onChange(e.target.value)}
            placeholder="Filter by Name or Notes"
            startAdornment={<InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>}
            endAdornment={
                filterText && (<InputAdornment position="end">
                    <IconButton
                        aria-label={
                            'Clear filter'
                        }
                        onClick={onClick}
                        // Prevents unnecessary focus outline
                        onMouseUp={e => e.preventDefault()}
                        onMouseDown={e => e.preventDefault()}
                        edge="end"
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </InputAdornment>)
            }
        />
    )
}