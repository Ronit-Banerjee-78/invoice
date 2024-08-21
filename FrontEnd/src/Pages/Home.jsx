import React, { useState } from 'react'
import Form from '../Components/Form.jsx'
import { FaPlus } from "react-icons/fa";
import InvoiceList from '../Components/InvoiceList.jsx';
import { Box } from '@mui/material';
import { Flex, Text , Button
 } from '@chakra-ui/react';

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)


  const controlFormVisibility = () => {
    setIsFormVisible(prevState => !prevState)
  }

  return (
    <Box className='home relative'>
      <Flex 
      align="center"
      justifyContent="space-between"
      p="1em"
      >
          <Text
           as="h1"
           letterSpacing="0.1em"
           fontWeight="700"
           fontSize={{base: "1.25em" , md: "1.5em" }}
           >Invoices</Text>

        <Button
          varient="outline"
          colorScheme='blackAlpha'
          // bg="gray.400"
          borderRadius="full"
          className="addInvoice"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={4}
          py={3}

          fontWeight="semibold"
          fontSize="base"
          letterSpacing="wider"
          cursor={isFormVisible ? 'not-allowed' : 'pointer'}
          isDisabled={isFormVisible}
          onClick={controlFormVisibility}
        > 
            <FaPlus className='mr-1' />
            New Invoice
          </Button>
        </Flex>
        
      {isFormVisible && <Form controlFormVisibility={controlFormVisibility} isFormVisible={isFormVisible} />}
      <InvoiceList/>
    </Box>
  )
}

export default Home
