import React, { useState, memo, useEffect } from "react";
import { useGetInvoicesQuery } from "../Redux/ApiSlice";
import InvoiceCard from "./InvoiceCard";
import FilterMode from "./FilterMode";
import { CircularProgress, Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const InvoiceList = () => {
  // The problem is that the useGetInvoicesQuery hook is not automatically refetching the data when the user logs in again. This is because the hook's behavior is to only refetch data when the cache expires or when the input parameters change.that's why i had to pass token in the hook.
  const { token } = useSelector((state) => state.auth);
  const { data, isError, refetch, isLoading, error } =
    useGetInvoicesQuery(token);
  const [filterType, setFilterType] = useState("");

  const filteredInvoices = data?.filter(
    (invoice) => filterType === "" || filterType === invoice.status
  );

  const filterInvoices = (type) => {
    setFilterType(type);
  };

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        minH="100%"
        className="invoice-list"
      >
        <CircularProgress
          isIndeterminate
          size="75px"
          thickness="10px"
          color="#8973f9"
        />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        align="center"
        justify="center"
        minH="100%"
        className="invoice-list"
      >
        <h1>
          {error.status} : {error.error}
        </h1>
      </Flex>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <p className="font-semibold text-[1.15rem] tracking-wider">
          Create Atleast One Invoice
        </p>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100%"
      p="4"
      className="invoice-list"
    >
      <FilterMode filterInvoices={filterInvoices} />
      {filteredInvoices.length === 0 ? (
        <Text
          textAlign="center"
          fontWeight="700"
          textTransform="capitalize"
          fontSize="1.5em"
          m="8"
          letterSpacing="wider"
        >
          No invoices found
        </Text>
      ) : (
        filteredInvoices.map((invoice) => (
          <InvoiceCard invoice={invoice} key={invoice._id} />
        ))
      )}
    </Flex>
  );
};

export default memo(InvoiceList);
