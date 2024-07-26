import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterIcon from '@mui/icons-material/FilterList';
import { useFilterContext } from "../utils/filterContext"
function FilterButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [selectedOption, setSelectedOption] = useState('recommended');
    const { selectedFilter, updateFilter } = useFilterContext();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (option) => {
        // setSelectedOption(option);
        if (selectedFilter === option) {
            updateFilter(null); // Deselect the filter if it's already selected
        } else {
            updateFilter(option); // Select the filter if it's not selected
        }
        setAnchorEl(null);

        // You can perform actions based on the selected option here.
    };

    return (
        <div>
            <IconButton
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <FilterIcon />
            </IconButton>
            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => handleOptionClick('recommended')}
                    selected={selectedFilter === 'recommended'}
                >
                    Recommended
                </MenuItem>
                <MenuItem
                    onClick={() => handleOptionClick('deliveryTime')}
                    selected={selectedFilter === 'deliveryTime'}
                >
                    Delivery Time
                </MenuItem>
                <MenuItem
                    onClick={() => handleOptionClick('price')}
                    selected={selectedFilter === 'price'}
                >
                    Cost for two: High-Low
                </MenuItem>
                <MenuItem
                    onClick={() => handleOptionClick('rating')}
                    selected={selectedFilter === 'rating'}
                >
                    Rating : High-Low
                </MenuItem>
            </Menu>
        </div>
    );
}

export default FilterButton;
