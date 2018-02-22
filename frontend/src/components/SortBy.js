import React from 'react'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

const SortBy = () => {
    return(
        <Dropdown color="primary" label="Sort By">
            <DropdownItem>Most popular first</DropdownItem>
            <DropdownItem>Newer first</DropdownItem>
        </Dropdown>
    )
}

export default SortBy