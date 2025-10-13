import { IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


export const SearchFilter = ({ filterText, onChange, onClick }: { filterText: string, onChange: (updated: string) => void, onClick: () => void }) => {
    return (
        <OutlinedInput
            sx={{ minWidth: '400px'}} 
            value={filterText}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Filter by Name or Notes"
            endAdornment={
                <InputAdornment position="end">
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
                </InputAdornment>
            }
        />
    )
}