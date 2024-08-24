import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFieldProps {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ searchTerm, handleSearchChange, label }) => {
    return (
        <TextField
            placeholder={label || "Search"}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchField;
