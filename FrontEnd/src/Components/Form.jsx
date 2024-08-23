import React, { useState } from 'react';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { IoTrashBin } from "react-icons/io5";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoicesApi } from '../Redux/ApiSlice';
import { useToast } from '@chakra-ui/react'

const formSchema = z.object({
  status: z.enum(['Paid', 'Pending', 'Draft'] , {
    message :  "Please Provide Status"
  }),
  organizationData: z.object({
    streetAddress: z.string().min(6, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(6, "Post Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  clientData: z.object({
    name: z.string().min(1, "client name is required"),
    email: z.string().email("Invalid email address"),
    streetAddress: z.string().min(6, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(6, "Post Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
    invoiceDate: z.date(),
    paymentTerms: z.enum(['Net 30 Days', 'Net 60 Days', 'Net 90 Days'], {
      message: 'Payment Terms is required'
    }),
    projectDescription: z.string().min(4, "Project Description is required"),
  items: z.array(
    z.object({
      name: z.string().min(1, "Item name is required"),
      quantity: z.number().min(1, "At least one item is required"),
      price: z.number().min(0.01, "Price is required"),
      total: z.number("Total is required"),
    })
  ).min(1, "At least one item is required"),
});

const Form = ({ isFormVisible, controlFormVisibility , data }) => {


  const {client , organization , status, projectDescription , invoiceDate , items , paymentTerms , _id } = data || {}
  const {streetAddress , city , postCode , country} = organization || {}
  const {name, email , streetAddress : clientStreetAddress , city : clientCity , postCode : clientPostCode , country : clientCountry} = client || {}

  const date = typeof invoiceDate === 'string' ? new Date(invoiceDate) : invoiceDate;
  const { register, handleSubmit, control, setValue, formState: { errors } , reset } = useForm({
    defaultValues: {
      status: status || 'Draft',
      organizationData: {
        streetAddress: streetAddress || '',
        city: city || '',
        postCode: postCode || '',
        country: country || '',
      },
      clientData: {
        name: name || '',
        email: email || '',
        streetAddress: clientStreetAddress || '',
        city: clientCity || '',
        postCode: clientPostCode || '',
        country: clientCountry || '',
      },
      invoiceDate: date || new Date(),
      paymentTerms: paymentTerms || 'Net 30 Days',
      projectDescription: projectDescription || '',

      items: items || [
        {
          name: '',
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
    },
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchItems = useWatch({
    control,
    name: 'items',
  });

  const [addInvoice] = InvoicesApi.useAddInvoiceMutation();
  const [updateInvoice] = InvoicesApi.useUpdateInvoiceMutation();

  const toast = useToast()


  const onFormSubmit = async (formData) => {
  console.log('Form submitted with data:');
  // console.log('Existing data id:', _id);

  try {
    if (_id) {
      console.log('Editing existing invoice');
      await updateInvoice({ id: _id, ...formData }).unwrap();
      toast({
          title: 'Invoice Edited Successfully.',
          description: "We've edited your Invoice for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      console.log('Invoice edited successfully' , formData);
    } else {
      console.log('Adding new invoice');
      await addInvoice(formData).unwrap();
      toast({
          title: 'Invoice created Successfully.',
          description: "We've created your Invoice for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      console.log('Invoice added successfully');
    }
    controlFormVisibility(false);
  } catch (err) {
    console.error('Failed to save invoice:', err);
  }
};


  const today = new Date();


  return (
    <form
      id='form'
      onSubmit={handleSubmit(onFormSubmit)}
      className='border-2 z-50 border-solid h-[90vh] absolute left-0 top-[0.75rem] overflow-y-scroll border-gray-300 p-8 m-4 bg-white rounded-lg'
    >
      {/* Status */}
      <div className='mb-2'>
        <label className='label'>Status</label>
        <select {...register('status')} className='w-fit px-3 py-2 border rounded-md'>
          <option value=""></option>
          <option value="Draft">Draft</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select> 
        {errors?.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>

      {/* organizationData */}
      <div className='mb-4'>
        <h3 className='tag'>Bill From</h3>
        <div className='mb-2'>
          <label className='label'>Street Address</label>
          <input {...register('organizationData.streetAddress')} className='input' />
          {errors.organizationData?.streetAddress && <p className="text-red-500">{errors.organizationData.streetAddress.message}</p>}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <div>
            <label className='label'>City</label>
            <input {...register('organizationData.city')} className='input' />
            {errors.organizationData?.city && <p className="text-red-500">{errors.organizationData.city.message}</p>}
          </div>
          <div>
            <label className='label'>Post Code</label>
            <input {...register('organizationData.postCode')} className='input' />
            {errors.organizationData?.postCode && <p className="text-red-500">{errors.organizationData.postCode.message}</p>}
          </div>
          <div>
            <label className='label'>Country</label>
            <input {...register('organizationData.country')} className='input' />
            {errors.organizationData?.country && <p className="text-red-500">{errors.organizationData.country.message}</p>}
          </div>
        </div>
      </div>

      {/* clientData */}
      <div className='mb-4'>
        <h3 className='tag'>Bill To</h3>
        <div className='mb-2'>
          <label className='label'>Name</label>
          <input {...register('clientData.name')} className='input' />
          {errors.clientData?.name && <p className="text-red-500">{errors.clientData.name.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='label'>Email</label>
          <input {...register('clientData.email')} type='email' className='input' />
          {errors.clientData?.email && <p className="text-red-500">{errors.clientData.email.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='label'>Street Address</label>
          <input {...register('clientData.streetAddress')} className='input' />
          {errors.clientData?.streetAddress && <p className="text-red-500">{errors.clientData.streetAddress.message}</p>}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <div>
            <label className='label'>City</label>
            <input {...register('clientData.city')} className='input' />
            {errors.clientData?.city && <p className="text-red-500">{errors.clientData.city.message}</p>}
          </div>
          <div>
            <label className='label'>Post Code</label>
            <input {...register('clientData.postCode')} className='input' />
            {errors.clientData?.postCode && <p className="text-red-500">{errors.clientData.postCode.message}</p>}
          </div>
          <div>
            <label className='label'>Country</label>
            <input {...register('clientData.country')} className='input' />
            {errors.clientData?.country && <p className="text-red-500">{errors.clientData.country.message}</p>}
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className='mb-4'>
        <div className="flex flex-wrap items-start justify-start sm:justify-around">
        <div className='mb-2 mx-2'>
          <label className='label'>Invoice Date</label>
          <Controller
            name="Invoice.invoiceDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={dayjs(field.value)}
                onChange={(date) => setValue('invoiceDate', date ? new Date(date) : null)}
                maxDate={dayjs(today)}
                className='input'
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            )}
          />
          {errors.invoiceDate && <p className="text-red-500">{errors.invoiceDate.message}</p>}
        </div>
        <div className='mb-2 mx-2'>
          <label className='label'>Payment Terms</label>
          <select {...register('paymentTerms')} className='w-full px-10  py-2 border rounded-md'>
            <option value=""></option>
            <option value="Net 30 Days">Net 30 Days</option>
            <option value="Net 60 Days">Net 60 Days</option>
            <option value="Net 90 Days">Net 90 Days</option>
          </select>
          {errors.paymentTerms && <p className="text-red-500">{errors.paymentTerms.message}</p>}
        </div>
        </div>
        <div className='mb-2'>
          <label className='label'>Project Description</label>
          <textarea {...register('projectDescription')} className='input w-full border-2 rounded-md' rows={3} />
          {errors.projectDescription && <p className="text-red-500">{errors.projectDescription.message}</p>}
        </div>
      </div>

      {/* Items */}
      <div className='mb-4'>
        <h3 className='text-lg font-semibold mt-4  mb-2 text-[#8973f9]'>Item List</h3>
        {fields.map((field, index) => (
          <div key={field.id} className='mb-4 border rounded-md p-4'>
            <div className='mb-2'>
              <label className='label'>Item Name</label>
              <input {...register(`items.${index}.name`)} className='input' />
              {errors.items?.[index]?.name && <p className="text-red-500">{errors.items[index].name.message}</p>}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
              <div>
                <label className='label'>Quantity</label>
                <input 
                type="number"
                 {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                  onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setValue(`items.${index}.quantity`, value);
                  setValue(`items.${index}.total`, value * watchItems[index]?.price);
                }}
                  className='input' />
                {errors.items?.[index]?.quantity && <p className="text-red-500">{errors.items[index].quantity.message}</p>}
              </div>
              <div>
                <label className='label'>Price</label>
                <input 
                type="number" 
                {...register(`items.${index}.price`, { valueAsNumber: true })} 
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setValue(`items.${index}.price`, value);
                  setValue(`items.${index}.total`, value * watchItems[index]?.quantity);
                }}
                className='input' />
                {errors.items?.[index]?.price && <p className="text-red-500">{errors.items[index].price.message}</p>}
              </div>
              <div>
                <label className='label'>Total</label>
                <input
                  type="number" 
                  value={watchItems[index]?.quantity * watchItems[index]?.price || 0}
                  className='input'
                  disabled
                  readOnly
                />
                {errors.items?.[index]?.total && <p className="text-red-500">{errors.items[index].total.message}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              className={`text-red-500 mt-2 flex items-center ${fields.length === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <IoTrashBin className='mr-1' /> Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: '', quantity: 1, price: 0, total: 0 })}
          className='w-full bg-blue-500 text-white py-2 rounded-md'
        >
          Add Item
        </button>
      </div>

      {/* Form Actions */}
      <div className='flex justify-between'>
        <button
          type="button"
          onClick={() => controlFormVisibility(false)}
          className='bg-gray-300 py-2 px-4 rounded-md'
        >
          Cancel
        </button>
        <button
          type="submit"
          className='bg-blue-500 text-white py-2 px-4 rounded-md'
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
