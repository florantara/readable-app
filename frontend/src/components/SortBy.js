import React from 'react'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

const SortBy = () => {
    return(
        <Dropdown color="primary" label="Sort By">
            <DropdownItem link="#/link1">Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
            <DropdownItem>Option 4</DropdownItem>
        </Dropdown>
    )
}

export default SortBy