import React from 'react'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import PropTypes from 'prop-types'

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

SortBy.propTypes = {
    onSortBySelection: PropTypes.func.isRequired
}

export default SortBy