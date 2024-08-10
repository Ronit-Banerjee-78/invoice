import React, { useState, useEffect } from 'react';
import { InvoicesApi } from '../Redux/ApiSlice';
import InvoiceCard from './InvoiceCard';
import FilterMode from './FilterMode';

const InvoiceList = () => {
    const { data, isError, isLoading, error } = InvoicesApi.useGetInvoicesQuery();
    const [filterData, setFilterData] = useState([]);
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        // Initialize filterData when data is available
        if (data) {
            setFilterData(data);
        }
    }, [data]);

    useEffect(() => {
        // Apply filter when filterType changes
        if (data) {
            if (filterType === '') {
                setFilterData(data); // Show all data if no filter type
            } else {
                setFilterData(data.filter((invoice) => filterType === invoice.status));
            }
        }
    }, [filterType, data]);

    const filterInvoices = (type) => {
        setFilterType(type); // Set the filter type to trigger the effect
    };

    if (isLoading) {
        return (
            <section className='invoice-list flex items-center justify-center min-h-full'>
                <div className="loader"></div>
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
        <section className='invoice-list min-h-full m-4 p-4 border-2 border-solid border-black'>
            {/* <FilterMode filterInvoices={filterInvoices} /> */}
            {filterData.length === 0 ? (
                <p>No invoices found.</p>
            ) : (
                filterData.map((invoice) => (
                    <InvoiceCard invoice={invoice} key={invoice._id} />
                ))
            )}
        </section>
    );
};

export default InvoiceList;
