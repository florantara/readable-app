import React from 'react'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

const SortBy = ({onSortBySelection}) => {

    const handleSortOption = (option) => {
        onSortBySelection(option)
    }
    return(
        <Dropdown color="primary" label="Sort By">
            <DropdownItem onClick={() => handleSortOption("popular")}>Most popular first</DropdownItem>
            <DropdownItem onClick={() => handleSortOption("date")}>Newest first</DropdownItem>
        </Dropdown>
    )
}

export default SortBy