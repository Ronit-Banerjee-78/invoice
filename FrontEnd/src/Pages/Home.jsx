import React, { useState, useContext } from "react";
import Form from "../Components/Form.jsx";
import { FaPlus } from "react-icons/fa";
import InvoiceList from "../Components/InvoiceList.jsx";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { ThemeContext } from "../App";

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;

  const controlFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <Box className="home relative">
      <Flex align="center" justifyContent="space-between" p="1em">
        <Text
          as="h1"
          letterSpacing="0.1em"
          fontWeight="700"
          textTransform="uppercase"
          fontSize={{ base: "1.25em", md: "1.5em" }}
        >
          Invoicely
        </Text>

        <Button
          varient="ghost"
          bg={theme === "light" ? "#F1F6F9" : "#131315"}
          color={theme === "light" ? "black" : "white"}
          rounded="md"
          _hover={{
            bg: theme === "light" ? "gray.200" : "gray.700",
            transition: "100ms all",
          }}
          className="addInvoice"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={4}
          py={3}
          fontWeight="semibold"
          fontSize="base"
          letterSpacing="wider"
          cursor={isFormVisible ? "not-allowed" : "pointer"}
          isDisabled={isFormVisible}
          onClick={controlFormVisibility}
        >
          <FaPlus className="mr-1" />
          New Invoice
        </Button>
      </Flex>

      {isFormVisible && (
        <Form
          controlFormVisibility={controlFormVisibility}
          isFormVisible={isFormVisible}
        />
      )}
      <InvoiceList />
    </Box>
  );
};

export default Home;
