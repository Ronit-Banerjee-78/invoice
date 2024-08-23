import React , {useState} from 'react';
import { InvoicesApi } from '../Redux/ApiSlice';
import { useParams , useNavigate, NavLink } from 'react-router-dom';
import Form from '../Components/Form';
import dayjs from 'dayjs';
import { CircularProgress, Text , Flex , Grid , Button, Box} from '@chakra-ui/react'
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { calculateDueDate } from '../Components/InvoiceCard';
import { RiEdit2Fill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useToast } from '@chakra-ui/react'


const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { data, isError, isLoading, error } = InvoicesApi.useGetSingleInvoiceQuery(id);
  const [deleteInvoice] = InvoicesApi.useDeleteInvoiceMutation(id)
  const [updateInvoiceStatus] = InvoicesApi.useUpdateInvoiceStatusMutation(id)

const trimId = id.substr(-7);


const controlFormVisibility = () => {
    setIsFormVisible(prevState => !prevState)
}

  const toast = useToast()


 const handleDelete = async () => {
    try {
      await deleteInvoice(id).unwrap();
      navigate('/');
      toast({
          title: 'Invoice deleted Successfully.',
          description: "We've deleted your Invoice for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
    } catch (error) {
      console.error('Failed to delete the invoice:', error);
      toast({
          title: 'Error while deleting invoice.',
          description: "Failed to delete the invoice.",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
    }
  };


const handleStatus = async () => {
  try {
    await updateInvoiceStatus({ id, status: 'Paid' }).unwrap();
    toast({
          title: 'Invoice status updated.',
          description: "We've updated your invoice status for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
  } catch (error) {
    console.error('Failed to update the invoice status:', error);
    toast({
          title: 'Error while updating invoice status.',
          description: "Failed to update the invoice status",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
  }
}


    if (isLoading) {
        return (
            <section className='flex items-center justify-center min-h-full'>
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
      <Flex align="center" justify="center" minH="100vh" bg="red.50">
        <Box p="6" border="2px" borderColor="red.400" bg="red.200" rounded="lg" color="red.800">
          <Text as="h1">Error</Text>
          <Text>{error.status} : {error.error}</Text>
        </Box>
      </Flex>
    );
  }

  if (!data) {
    return (
      <Flex align="center" justify="center" minH="100vh" bg="gray.50">
        <Box p="6" border="2px" borderColor="gray.400" bg="gray.200" rounded="lg" color="gray.800">
          <Text as="h1">Create Atleast One Invoice</Text>
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
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();

      return `${day} ${monthName} ${year}`
}

const ConvertedInvoiceDate = convertDate(invoiceDate)
const paymentDate = calculateDueDate(invoiceDate , paymentTerms)
const itemsTotal = items.map((item) => item.total);

function calculateTotalAmount(accumulator, value) {
  return accumulator + value;
}

const totalAmount = itemsTotal.reduce(calculateTotalAmount, 0);



  return (
    <Box className='min-h-screen mx-auto w-[100vw] md:w-[70vw] p-8'>
        <NavLink to="/">
        <Text gap="0" maxW="fit-content" _hover={{
          color: "#775df7"
        }} >
        <MdOutlineKeyboardDoubleArrowLeft size={32} />
        </Text>
        </NavLink>

        {isFormVisible && <Form data={data} controlFormVisibility={controlFormVisibility} isFormVisible={isFormVisible} />}




        <Flex align="center" bg="gray.200" flexWrap="wrap" justify="space-between" p="4" my="6" shadow="lg" rounded="md"
         className=''>
           <Text fontWeight="600" rounded="md" letterSpacing="widest" className={`flex items-center justify-center
              ${status === 'Pending' ? 'bg-yellow-300 text-yellow-600' : ''}
              ${status === 'Paid' ? 'text-green-600 bg-green-300' : ''}
              ${status === 'Draft' ? 'bg-gray-500 text-gray-100' : ''} px-4 py-2`}>
              <GoDotFill size={18} />
              {status}
          </Text>
          <Box>
            <Button variant='ghost'  className='px-4 font-semibold bg-blue-400 text-white rounded-md tracking-wider py-2 m-2' onClick={() => controlFormVisibility()}><RiEdit2Fill size={22} /></Button>
            <Button variant='ghost' className='px-4 rounded-md font-semibold tracking-wider py-2 m-2 bg-red-400 text-white' onClick={() => handleDelete()}><IoTrashBinSharp size={22}/></Button>
            {status !== "Paid" && 
            <Button variant='ghost' className='px-4 rounded-md font-semibold tracking-wider py-2 m-2 bg-[#8973f9] text-white' onClick={() => handleStatus()}><MdOutlinePublishedWithChanges size={22}/></Button>
            }
          </Box>
        </Flex>


 {/* direction={{base: "column" , md: "row"}} */}

        <Box shadow="lg" bg="gray.200" rounded="md" p={{base: "1em" , md: "2em"}} mt="3em" m="1em">
          <Flex align="start" justify={{base: "space-between" , md: "space-between"}}>
            <Box>
              <Text as="h1" letterSpacing="wider" fontWeight="700" textTransform="uppercase" fontSize={{base: "1em" , sm: "1.25em"}}>#{trimId}</Text>
              <Text textTransform="capitalize">{projectDescription}</Text>
            </Box>
            <Box textAlign={{base: "left" , md: "right"}} textTransform="capitalize">
              <Text>{organization.streetAddress}</Text>
              <Text>{organization.city}</Text>
              <Text>{organization.postCode}</Text>
              <Text>{organization.country}</Text>
            </Box>
          </Flex>





{/* direction={{base: "column" , md: "row"}} */}
          {/* --------- 3 columns ----------- */}
          <Flex mt="3em" align="start" flexWrap="wrap"  justify="space-between">
            {/* --------- 1 ------ */}
          <Flex align="start" justify={{base: "start" , md: "space-between"}} direction="column" minH={{base: "fit-content" , md: "10em"}} textAlign="left" m="1em">
            <div>
            <Text textTransform="capitalize">invoice date</Text>
            <Text fontSize={{base: "1.05em" , md: "1.25em"}} fontWeight="700">{ConvertedInvoiceDate}</Text>
            </div>
            <div>
            <Text textTransform="capitalize">payment date</Text>
            <Text fontSize={{base: "1.05em" , md: "1.25em"}} fontWeight="700">{paymentDate}</Text>
            </div>
          </Flex>
          {/* --------- 2 ------- */}
          <Flex textAlign="start" textTransform="capitalize" direction="column" m="1em">
            <Text>Bill To</Text>
            <Text my="0.25em" fontSize={{base: "1.05em" , md: "1.25em"}} fontWeight="700">{client.name}</Text>
            <Text>{client.streetAddress}</Text>
            <Text>{client.city}</Text>
            <Text>{client.postCode}</Text>
            <Text>{client.country}</Text>
          </Flex>
          {/* ---------- 3 -------------- */}
          <Flex textAlign="start" direction="column" m="1em">
          <Text>Sent To</Text>
          <Text mt="0.25em" fontSize={{base: "1.05em" , md: "1.25em"}} fontWeight="700">{client.email}</Text>
          </Flex>
        </Flex>
        


        {/* ---------- items ------------ */}

  <Box p="1.5em" mt="3em" bg="gray.100" rounded="md" shadow="md" display={{base: "none" , sm: "block"}} className="">
  <Grid templateColumns="repeat(4, 1fr)" py="0.5em" gap={4} fontWeight="bold">
    <Text>Name</Text>
    <Text textAlign="center">Qty.</Text>
    <Text textAlign="center">Price</Text>
    <Text textAlign="right">Total</Text>
  </Grid>

  {items.map((item, index) => (
    <Grid templateColumns="repeat(4, 1fr)"  py="1.5em" gap={4} key={index}>
      <Text textTransform="capitalize">{item.name}</Text>
      <Text textAlign="center">{item.quantity}</Text>
      <Text textAlign="center">${item.price}.00</Text>
      <Text textAlign="right">${item.total}.00</Text>
    </Grid>
  ))}

  <Flex rounded="md" p="2em" bg="black" color="white" align="center" justify="space-between">
    <Text>Grand Total</Text>
    <Text rounded="md" fontSize="2em" fontWeight="700" letterSpacing="wider">${totalAmount}.00</Text>
  </Flex>
</Box>





 <Box p="1em" mt="3em" bg="gray.100" display={{base: "block" , sm: "none"}} className="">
  {items.map((item, index) => (
    <Flex align="center" key={index} justify="space-between">
      <Box>
        <Text textTransform="capitalize" fontWeight="700">{item.name}</Text>
        <Text>{item.quantity} X ${item.price}.00</Text>
      </Box>

      <Box>
        <Text  fontWeight="700" fontSize="1em">${item.total}.00</Text>
      </Box>
    </Flex>
  ))}
   <Flex mt="1.5em" p="0.5em" rounded="md" bg="black" color="white" shadow="md" align="center" justify="space-between">
    <Text>Total</Text>
    <Text fontSize="1.5em" fontWeight="700" letterSpacing="wider">${totalAmount}.00</Text>
  </Flex>
</Box>





        </Box>
    </Box>
  );
};

export default Invoice;
