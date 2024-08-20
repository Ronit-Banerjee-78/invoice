import React from 'react'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { Box} from '@mui/material';
import { Flex, Text } from '@chakra-ui/react';


const InvoiceCard = ({invoice}) => {
    const {_id , client , organization , items , invoiceDate , paymentTerms , status} = invoice
    const {name, steetAddress , city , postCode , country} = client

    const itemsTotal = items.map((item) => item.total)

    function calculateTotalAmount(accumulator,value){
        return accumulator + value
    }
    const totalAmount = itemsTotal.reduce(calculateTotalAmount,0)

   function calculateDueDate(invoiceDate, paymentTerms) {
    const date = new Date(invoiceDate);

    let daysToAdd = 0;
    if (paymentTerms === 'Net 30 Days') {
        daysToAdd = 30;
    } else if (paymentTerms === 'Net 60 Days') {
        daysToAdd = 60;
    } else if (paymentTerms === 'Net 90 Days') {
        daysToAdd = 90;
    }

    date.setDate(date.getDate() + daysToAdd);

    const day = date.getDate();
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
}
const dueDate = calculateDueDate(invoiceDate, paymentTerms);


const trimId = _id.substr(-5)


  return (
    <Flex
    flexWrap="wrap"
    gap="1rem"
    alignItems="center"
    justifyContent="space-around"
    p="2em"
    borderWidth="1px"
    borderRadius="md"
    shadow="sm"
    bg="gray.200"
    className='invoiceCard'
    >  

        <Text className='uppercase'>#{trimId}</Text>
        <Text>Due {dueDate}</Text>
        <Text className='text-xl font-bold'>${totalAmount}</Text>    
        <Text className='capitalize'>{name}</Text>
        <Text className={`flex items-center justify-center
            ${status === 'Pending' ? 'bg-yellow-300 text-yellow-600' : ''}
            ${status === 'Paid' ? 'text-green-600 bg-green-300' : ''}
            ${status === 'Draft' ? 'bg-gray-500 text-gray-100' : ''}
         px-4 py-2 rounded-md`}>
        <GoDotFill size={18} />{status}
        </Text>
        <NavLink to={`/${_id}`}>
            <button className='invoiceCardButton'><IoIosArrowDroprightCircle  size={32} /></button>
        </NavLink>
    </Flex>
  )
}

export default InvoiceCard
