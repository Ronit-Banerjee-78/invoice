import React , {useState} from 'react';
import { InvoicesApi } from '../Redux/ApiSlice';
import { useParams , useNavigate, NavLink } from 'react-router-dom';
import Form from '../Components/Form';
import dayjs from 'dayjs';
import { CircularProgress, Text , Flex , Button, Box} from '@chakra-ui/react'
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { calculateDueDate } from '../Components/InvoiceCard';
import { RiEdit2Fill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

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

 const handleDelete = async () => {
    try {
      await deleteInvoice(id).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the invoice:', error);
    }
  };


const handleStatus = async () => {
  try {
    await updateInvoiceStatus({ id, status: 'Paid' }).unwrap();
  } catch (error) {
    console.error('Failed to update the invoice status:', error);
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
      <section className='min-h-screen bg-red-50 flex items-center justify-center'>
        <div className='p-6 bg-red-200 border border-red-400 rounded-lg text-red-800'>
          <h1 className='text-2xl font-semibold'>Error</h1>
          <p>{error.status} : {error.error}</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='p-6 bg-gray-200 border border-gray-400 rounded-lg text-gray-800'>
          <h1 className='text-2xl font-semibold'>No data found.</h1>
        </div>
      </section>
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
            <Button variant='ghost' className='px-4 rounded-md font-semibold tracking-wider py-2 m-2 bg-[#8973f9] text-white' onClick={() => handleStatus()}><MdOutlinePublishedWithChanges size={22}/></Button>
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
          <Flex mt="2em" align="start" flexWrap="wrap"  justify="space-between">
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
        </Box>


        {/* ---------- items ------------ */}






    </Box>
  );
};

export default Invoice;
