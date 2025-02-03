import React from "react";
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Flex, Grid, Box, Text } from "@chakra-ui/react";
import { ThemeContext } from "../App";
import { useContext } from "react";

export const calculateDueDate = (invoiceDate, paymentTerms) => {
  const date = new Date(invoiceDate);

  let daysToAdd = 0;
  if (paymentTerms === "Net 30 Days") {
    daysToAdd = 30;
  } else if (paymentTerms === "Net 60 Days") {
    daysToAdd = 60;
  } else if (paymentTerms === "Net 90 Days") {
    daysToAdd = 90;
  }

  date.setDate(date.getDate() + daysToAdd);

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
};

const InvoiceCard = ({ invoice }) => {
  const {
    _id,
    client,
    organization,
    items,
    invoiceDate,
    paymentTerms,
    status,
  } = invoice;
  const { name, steetAddress, city, postCode, country } = client;

  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;

  const itemsTotal = items.map((item) => item.total);

  function calculateTotalAmount(accumulator, value) {
    return accumulator + value;
  }

  const totalAmount = itemsTotal.reduce(calculateTotalAmount, 0);

  const dueDate = calculateDueDate(invoiceDate, paymentTerms);
  const trimId = _id.substr(-7);

  return (
    <NavLink to={`/${_id}`}>
      <Flex
        w="fit-content"
        align={{ base: "start", md: "center" }}
        bg={theme === "light" ? "#F5F7F8" : "#000000"}
        justify="space-around"
        flexWrap="wrap"
        pos="relative"
        shadow="lg"
        minH="7em"
        rounded="md"
        className="invoiceCard w-fit"
        pt="3em"
        px={{ base: "1em", md: "1em" }}
        pb="2em"
        m="1em"
        transition="200ms 100ms linear transform"
        _hover={{ transform: "Scale(1.05)" }}
      >
        <Text
          pos="absolute"
          top="0"
          left="0"
          roundedTopLeft="md"
          fontWeight="600"
          letterSpacing="widest"
          className={`flex items-center justify-center 
          ${status === "Pending" ? "bg-yellow-200 text-yellow-600" : ""}
          ${status === "Paid" ? "bg-green-200 text-green-600 " : ""}
          ${status === "Draft" ? "bg-gray-500 text-gray-100" : ""} px-4 py-2`}
        >
          <GoDotFill size={18} />
          {status}
        </Text>
        <Grid
          templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
          gap={{ base: "1em", md: "1.5em" }}
          fontSize={{ base: "1em", md: "1.05em", lg: "1.2em" }}
          className="text-left md:text-center"
        >
          <Text fontWeight="700" className="uppercase">
            #{trimId}
          </Text>
          <Text>Due {dueDate}</Text>
          <Text className="capitalize">{name}</Text>
          <Text className="text-xl font-bold">${totalAmount}</Text>
        </Grid>
      </Flex>
    </NavLink>
  );
};
export default InvoiceCard;
