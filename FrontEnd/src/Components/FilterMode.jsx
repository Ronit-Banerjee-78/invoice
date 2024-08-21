import React, { useState } from 'react';
import { Button, Box, Flex } from '@chakra-ui/react';

const FilterMode = ({ filterInvoices }) => {
    const filterTypes = ['All', 'Draft', 'Pending', 'Paid'];
    const [selectedType, setSelectedType] = useState('All');

    const handleClick = (type) => {
        setSelectedType(type);
        filterInvoices(type === 'All' ? '' : type); // Apply filter or show all
    };

    return (
        <Box mx="auto" mb="24" bg="gray.200" rounded="lg">
            <Flex justify="center" align="center" flexWrap="wrap">
                {filterTypes.map((type, index) => (
                    <Button
                        key={index}
                        px="4"
                        fontWeight="700"
                        py="2"
                        m="2"
                        _hover={{
                            color:"#8973f9",
                            // transform: "scale(1.1)",
                            transition: "100ms all"
                        }}
                        rounded="full"
                        variant={selectedType === type ? 'solid' : 'outline'}
                        colorScheme={selectedType === type ? 'purple' : 'gray'}
                        onClick={() => handleClick(type)}
                    >
                        {type}
                    </Button>
                ))}
            </Flex>
        </Box>
    );
};

export default FilterMode;
