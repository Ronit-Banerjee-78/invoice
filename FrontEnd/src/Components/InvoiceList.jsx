import React, { useState, useEffect } from 'react';
import { InvoicesApi } from '../Redux/ApiSlice';
import InvoiceCard from './InvoiceCard';
import FilterMode from './FilterMode';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const InvoiceList = () => {
    const { data, isError, isLoading, error } = InvoicesApi.useGetInvoicesQuery();
    const [filterData, setFilterData] = useState([]);
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        if (data) {
            setFilterData(data);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            if (filterType === '') {
                setFilterData(data);
            } else {
                setFilterData(data.filter((invoice) => filterType === invoice.status));
            }
        }
    }, [filterType, data]);

    const filterInvoices = (type) => {
        setFilterType(type);
    };

    if (isLoading) {
        return (
            <section className='invoice-list flex items-center justify-center min-h-full'>
                <CircularProgress
                isIndeterminate
                size="75px"
                thickness="10px"
                color="#8973f9"/>
            </section>
        );
    }

    if (isError) {
        return (
            <section className='invoice-list min-h-full'>
                <h1>{error.status} : {error.error}</h1>
            </section>
        );
    }

    return (
        <section className='invoice-list min-h-full p-4 flex flex-col items-center'>
            <FilterMode filterInvoices={filterInvoices} />
            {filterData.length === 0 ? (
                <p className='text-center font-bold capitalize tracking-widest text-xl m-8'>No invoices found</p>
            ) : (
                filterData.map((invoice) => (
                    <InvoiceCard invoice={invoice} key={invoice._id} />
                ))
            )}
        </section>
    );
};

export default InvoiceList;
