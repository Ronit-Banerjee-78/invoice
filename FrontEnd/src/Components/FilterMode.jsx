import React, { useState } from 'react';

const FilterMode = ({ filterInvoices }) => {
    const filterTypes = ['All', 'Draft', 'Pending', 'Paid'];
    const [selectedType, setSelectedType] = useState('All');

    const handleClick = (type) => {
        setSelectedType(type);
        filterInvoices(type === 'All' ? '' : type); // Apply filter or show all
    };

    return (
        <div className='mx-auto p-4 flex items-center justify-center'>
            {filterTypes.map((type, index) => (
                <button
                    key={index}
                    value={type}
                    className={`mx-2 my-2 px-6 py-2 rounded-full tracking-wider ${
                        selectedType === type
                            ? 'bg-[#8973f9] text-white'
                            : 'bg-black text-white'
                    }`}
                    onClick={() => handleClick(type)}
                    aria-pressed={selectedType === type}
                    aria-label={`Filter by ${type}`}
                >
                    {type}
                </button>
            ))}
        </div>
    );
};

export default FilterMode;
