import React , {useState} from 'react';
import { InvoicesApi } from '../Redux/ApiSlice';
import { useParams , useNavigate } from 'react-router-dom';
import Form from '../Components/Form';
import dayjs from 'dayjs';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { data, isError, isLoading, error } = InvoicesApi.useGetSingleInvoiceQuery(id);
  const [deleteInvoice] = InvoicesApi.useDeleteInvoiceMutation(id)
  const [updateInvoiceStatus] = InvoicesApi.useUpdateInvoiceStatusMutation(id)

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

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='bg-white shadow-md rounded-lg p-6'>
      {isFormVisible && <Form data={data} controlFormVisibility={controlFormVisibility} isFormVisible={isFormVisible} />}
        <header className='flex items-center justify-between mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Invoice #{id}</h1>
          <span className={`px-4 py-2 rounded-full text-white ${status === 'Paid' ? 'bg-green-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-500'}`}>
            {status}
          </span>
        </header>

        <div className='flex justify-end mb-6 space-x-4'>
          <button 
          onClick={() => controlFormVisibility()}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-150'>
            Edit
          </button>
          <button 
          onClick={() => handleDelete()}
          className='px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-150'>
            Delete
          </button>
          {status !== 'Paid' &&
          <button 
          onClick = {() => handleStatus()} 
          className='px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-150'>
            Mark as Paid
          </button>}
        </div>

        <section className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Bill From</h2>
          <div className='bg-gray-50 p-4 rounded-lg shadow-inner'>
            <p className='text-gray-600'>{organization.streetAddress}</p>
            <p className='text-gray-600'>{organization.city}, {organization.country}</p>
            <p className='text-gray-600'>{organization.postCode}</p>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Bill To</h2>
          <div className='bg-gray-50 p-4 rounded-lg shadow-inner'>
            <p className='text-gray-600'>{client.name}</p>
            <p className='text-gray-600'>{client.email}</p>
            <p className='text-gray-600'>{client.streetAddress}</p>
            <p className='text-gray-600'>{client.city}, {client.country}</p>
            <p className='text-gray-600'>{client.postCode}</p>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Invoice Details</h2>
          <div className='bg-gray-50 p-4 rounded-lg shadow-inner'>
            <p className='text-gray-600'><strong>Invoice Date:</strong> {dayjs(invoiceDate).format('MMMM D, YYYY')}</p>
            <p className='text-gray-600'><strong>Payment Terms:</strong> {paymentTerms}</p>
            <p className='text-gray-600'><strong>Project Description:</strong> {projectDescription}</p>
          </div>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Item List</h2>
          <table className='w-full bg-white border border-gray-300 rounded-lg shadow-sm'>
            <thead>
              <tr className='bg-gray-100 border-b'>
                <th className='p-4 text-left text-gray-600'>Item Name</th>
                <th className='p-4 text-left text-gray-600'>Quantity</th>
                <th className='p-4 text-left text-gray-600'>Price</th>
                <th className='p-4 text-left text-gray-600'>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='p-4 text-gray-700'>{item.name}</td>
                  <td className='p-4 text-gray-700'>{item.quantity}</td>
                  <td className='p-4 text-gray-700'>${item.price.toFixed(2)}</td>
                  <td className='p-4 text-gray-700'>${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Invoice;
