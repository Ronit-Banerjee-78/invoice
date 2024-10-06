import React, { useState, useContext, useEffect } from "react";
import {
  useGetSingleInvoiceQuery,
  useUpdateInvoiceStatusMutation,
  useDeleteInvoiceMutation,
} from "../Redux/ApiSlice";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Form from "../Components/Form";
import {
  CircularProgress,
  Text,
  Flex,
  Grid,
  Button,
  Box,
} from "@chakra-ui/react";
import { ThemeContext } from "../App";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { calculateDueDate } from "../Components/InvoiceCard";
import { RiEdit2Fill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const themeData = useContext(ThemeContext);
  const { theme, toggleTheme } = themeData;
  const { data, isError, isLoading, error, refetch } =
    useGetSingleInvoiceQuery(id);
  const [deleteInvoice] = useDeleteInvoiceMutation(id);
  const [updateInvoiceStatus] = useUpdateInvoiceStatusMutation(id);
  const { token } = useSelector((state) => state.auth);

  const trimId = id.slice(-7);

  const controlFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  // useEffect(() => {
  //   refetch();
  // }, [token]);

  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteInvoice(id).unwrap();
      navigate("/");
      toast({
        title: "Invoice deleted Successfully.",
        description: "We've deleted your Invoice for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      // console.error("Failed to delete the invoice:", error);
      toast({
        title: "Error",
        description: error?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleStatus = async () => {
    try {
      await updateInvoiceStatus({ id, status: "Paid" }).unwrap();
      toast({
        title: "Invoice status updated.",
        description: "We've updated your invoice status for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      // console.error("Failed to update the invoice status:", error);
      toast({
        title: "Error",
        description: error?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-full">
        <CircularProgress
          isIndeterminate
          size="75px"
          thickness="10px"
          color="#8973f9"
        />
      </section>
    );
  }

  if (isError) {
    return (
      <Flex align="center" justify="center" minH="100vh" bg="red.50">
        <Box
          p="6"
          border="2px"
          borderColor="red.400"
          bg="red.200"
          rounded="lg"
          color="red.800"
        >
          <Text as="h1">Error</Text>
          <Text>
            {error.status} : {error.error}
          </Text>
        </Box>
      </Flex>
    );
  }

  const {
    organization,
    client,
    items,
    paymentTerms,
    projectDescription,
    invoiceDate,
    status,
  } = data;

  const convertDate = (invoiceDate) => {
    const date = new Date(invoiceDate);
    const day = date.getDate();
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
  };

  const ConvertedInvoiceDate = convertDate(invoiceDate);
  const paymentDate = calculateDueDate(invoiceDate, paymentTerms);
  const itemsTotal = items.map((item) => item.total);

  function calculateTotalAmount(accumulator, value) {
    return accumulator + value;
  }

  const totalAmount = itemsTotal.reduce(calculateTotalAmount, 0);

  return (
    <Box
      minH="100vh"
      marginX="auto"
      p="8"
      width={{ base: "100vw", md: "80vw" }}
      bg={theme === "light" ? "#F1F6F9" : "#131315"}
      color={theme === "light" ? "black" : "white"}
    >
      <NavLink to="/">
        <Text
          gap="0"
          maxW="fit-content"
          _hover={{
            color: "#775df7",
          }}
        >
          <MdOutlineKeyboardDoubleArrowLeft size={32} />
        </Text>
      </NavLink>

      {isFormVisible && (
        <Form
          data={data}
          controlFormVisibility={controlFormVisibility}
          isFormVisible={isFormVisible}
        />
      )}

      <Flex
        align="center"
        bg={theme === "light" ? "#F1F6F9" : "#252527"}
        color={theme === "light" ? "black" : "white"}
        // direction={{ base: "column", sm: "row" }}
        flexWrap="wrap"
        justify="space-between"
        p="4"
        my="6"
        shadow="lg"
        rounded="md"
        className=""
      >
        <Text
          fontWeight="600"
          rounded="md"
          letterSpacing="widest"
          className={`flex items-center justify-center
              ${status === "Pending" ? "bg-yellow-300 text-yellow-600" : ""}
              ${status === "Paid" ? "text-green-600 bg-green-300" : ""}
              ${
                status === "Draft" ? "bg-gray-500 text-gray-100" : ""
              } px-4 py-2`}
        >
          <GoDotFill size={18} />
          {status}
        </Text>
        <Box className="">
          <Button
            variant="ghost"
            className="px-2 font-semibold bg-blue-400 text-white rounded-md tracking-wider py-2 m-2"
            onClick={() => controlFormVisibility()}
          >
            <RiEdit2Fill size={22} />
          </Button>
          <Button
            variant="ghost"
            className="px-2 rounded-md font-semibold tracking-wider py-2 m-2 bg-red-400 text-white"
            onClick={() => handleDelete()}
          >
            <IoTrashBinSharp size={22} />
          </Button>
          {status !== "Paid" && (
            <Button
              variant="ghost"
              className="px-2 rounded-md font-semibold tracking-wider py-2 m-2 bg-[#8973f9]"
              onClick={() => handleStatus()}
            >
              <MdOutlinePublishedWithChanges size={22} />
            </Button>
          )}
        </Box>
      </Flex>

      <Box
        shadow="lg"
        bg={theme === "light" ? "#F1F6F9" : "#131315"}
        color={theme === "light" ? "black" : "white"}
        borderWidth="2px"
        rounded="md"
        p={{ base: "1em", md: "2em" }}
        mt="3em"
        m="1em"
      >
        <Flex
          align="start"
          direction={{ base: "column", md: "row" }}
          justify={{ base: "space-between", md: "space-between" }}
          p={{ base: "1em", md: "2em" }}
        >
          <Box className="mb-4 md:mb-0">
            <Text
              as="h1"
              letterSpacing="wider"
              fontWeight="700"
              textTransform="uppercase"
              fontSize={{ base: "1.5em", sm: "1.25em" }}
            >
              #{trimId}
            </Text>
            <Text textTransform="capitalize">{projectDescription}</Text>
          </Box>
          <Box
            textAlign={{ base: "left", md: "right" }}
            textTransform="capitalize"
          >
            <h1 className="mb-2">Bill From</h1>
            <Text>{organization.streetAddress}</Text>
            <Text>{organization.city}</Text>
            <Text>{organization.postCode}</Text>
            <Text>{organization.country}</Text>
          </Box>
        </Flex>

        {/* direction={{base: "column" , md: "row"}} */}
        {/* --------- 3 columns ----------- */}
        <Flex mt="3em" align="start" flexWrap="wrap" justify="space-between">
          {/* --------- 1 ------ */}
          <Flex
            align="start"
            justify={{ base: "start", md: "space-between" }}
            direction="column"
            minH={{ base: "fit-content", md: "10em" }}
            textAlign="left"
            m="1em"
          >
            <div>
              <Text textTransform="capitalize">invoice date</Text>
              <Text
                fontSize={{ base: "1.05em", md: "1.25em" }}
                fontWeight="700"
              >
                {ConvertedInvoiceDate}
              </Text>
            </div>
            <div>
              <Text textTransform="capitalize">payment date</Text>
              <Text
                fontSize={{ base: "1.05em", md: "1.25em" }}
                fontWeight="700"
              >
                {paymentDate}
              </Text>
            </div>
          </Flex>
          {/* --------- 2 ------- */}
          <Flex
            textAlign="start"
            textTransform="capitalize"
            direction="column"
            m="1em"
          >
            <Text>Bill To</Text>
            <Text
              my="0.25em"
              fontSize={{ base: "1.05em", md: "1.25em" }}
              fontWeight="700"
            >
              {client.name}
            </Text>
            <Text>{client.streetAddress}</Text>
            <Text>{client.city}</Text>
            <Text>{client.postCode}</Text>
            <Text>{client.country}</Text>
          </Flex>
          {/* ---------- 3 -------------- */}
          <Flex textAlign="start" direction="column" m="1em">
            <Text>Sent To</Text>
            <Text
              mt="0.25em"
              fontSize={{ base: "1.05em", md: "1.25em" }}
              fontWeight="700"
            >
              {client.email}
            </Text>
          </Flex>
        </Flex>

        {/* ---------- items ------------ */}

        <Box
          p="1.5em"
          mt="3em"
          bg={theme === "light" ? "#F1F6F9" : "#252527"}
          color={theme === "light" ? "black" : "white"}
          rounded="md"
          shadow="md"
          display={{ base: "none", sm: "block" }}
          fontSize="1.1em"
        >
          <Grid
            templateColumns="repeat(4, 1fr)"
            py="0.5em"
            gap={4}
            fontWeight="bold"
          >
            <Text>Name</Text>
            <Text textAlign="center">Qty.</Text>
            <Text textAlign="center">Price</Text>
            <Text textAlign="right">Total</Text>
          </Grid>

          {items.map((item, index) => (
            <Grid
              templateColumns="repeat(4, 1fr)"
              py="1.5em"
              gap={4}
              key={index}
            >
              <Text textTransform="capitalize">{item.name}</Text>
              <Text textAlign="center">{item.quantity}</Text>
              <Text textAlign="center">${item.price}.00</Text>
              <Text textAlign="right">${item.total}.00</Text>
            </Grid>
          ))}

          <Flex
            rounded="md"
            p="2em"
            bg="black"
            color="white"
            align="center"
            justify="space-between"
          >
            <Text>Grand Total</Text>
            <Text
              rounded="md"
              fontSize="2em"
              fontWeight="700"
              letterSpacing="wider"
            >
              ${totalAmount}.00
            </Text>
          </Flex>
        </Box>

        <Box
          p="1em"
          mt="3em"
          bg={theme === "light" ? "#F1F6F9" : "#252527"}
          color={theme === "light" ? "black" : "white"}
          display={{ base: "block", sm: "none" }}
          className=""
        >
          {items.map((item, index) => (
            <Flex
              align="center"
              marginBottom="0.5em"
              key={index}
              justify="space-between"
            >
              <Box>
                <Text textTransform="capitalize" fontWeight="700">
                  {item.name}
                </Text>
                <Text>
                  {item.quantity} X ${item.price}.00
                </Text>
              </Box>

              <Box>
                <Text fontWeight="700" fontSize="1em">
                  ${item.total}.00
                </Text>
              </Box>
            </Flex>
          ))}
          <Flex
            mt="1.5em"
            p="0.5em"
            rounded="md"
            bg="black"
            color="white"
            shadow="md"
            align="center"
            justify="space-between"
          >
            <Text>Total</Text>
            <Text
              fontSize="1.5em"
              paddingX="4"
              fontWeight="700"
              letterSpacing="wider"
            >
              ${totalAmount}.00
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
