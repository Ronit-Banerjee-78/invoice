import React from 'react';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { IoTrashBin } from "react-icons/io5";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  Status: z.object({
    value: z.enum(['Paid', 'Pending', 'Draft']),
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
  Invoice: z.object({
    invoiceDate: z.date(),
    paymentTerms: z.enum(['Net 30 Days', 'Net 60 Days', 'Net 90 Days'], {
      message: 'Payment Terms is required'
    }),
    projectDescription: z.string().min(4, "Project Description is required"),
  }),
  Item: z.array(
    z.object({
      name: z.string().min(1, "Item name is required"),
      quantity: z.number().min(1, "At least one item is required"),
      price: z.number().min(0.01, "Price is required"),
      total: z.number().min(0.01, "Total is required"),
    })
  ).min(1, "At least one item is required"),
});

const Form = ({ isFormVisible, controlFormVisibility }) => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      Status: {
        value: '',
      },
      organizationData: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
      },
      clientData: {
        name: '',
        email: '',
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
      },
      Invoice: {
        invoiceDate: new Date(),
        paymentTerms: '',
        projectDescription: '',
      },
      Item: [
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
    name: 'Item',
  });

  const watchItems = useWatch({
    control,
    name: 'Item',
  });

  const onFormSubmit = (data) => {
    console.log(data);
  };

  const today = new Date();

  return (
    <form
      id='form'
      onSubmit={handleSubmit(onFormSubmit)}
      className='border-2 border-solid border-gray-300 p-8 m-4 w-[30rem] bg-white rounded-lg'
    >
      {/* Status */}
      <div className='mb-2'>
        <label className='block mb-1'>Status</label>
        <select {...register('Status.value')} className='w-full px-3 py-2 border rounded-md'>
          <option value=""></option>
          <option value="Draft">Draft</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select> 
        {errors.Status?.value && <p className="text-red-500">{errors.Status.value.message}</p>}
      </div>

      {/* organizationData */}
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Bill From</h3>
        <div className='mb-2'>
          <label className='block mb-1'>Street Address</label>
          <input {...register('organizationData.streetAddress')} className='w-full px-3 py-2 border rounded-md' />
          {errors.organizationData?.streetAddress && <p className="text-red-500">{errors.organizationData.streetAddress.message}</p>}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <div>
            <label className='block mb-1'>City</label>
            <input {...register('organizationData.city')} className='w-full px-3 py-2 border rounded-md' />
            {errors.organizationData?.city && <p className="text-red-500">{errors.organizationData.city.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Post Code</label>
            <input {...register('organizationData.postCode')} className='w-full px-3 py-2 border rounded-md' />
            {errors.organizationData?.postCode && <p className="text-red-500">{errors.organizationData.postCode.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Country</label>
            <input {...register('organizationData.country')} className='w-full px-3 py-2 border rounded-md' />
            {errors.organizationData?.country && <p className="text-red-500">{errors.organizationData.country.message}</p>}
          </div>
        </div>
      </div>

      {/* clientData */}
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Bill To</h3>
        <div className='mb-2'>
          <label className='block mb-1'>Name</label>
          <input {...register('clientData.name')} className='w-full px-3 py-2 border rounded-md' />
          {errors.clientData?.name && <p className="text-red-500">{errors.clientData.name.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Email</label>
          <input {...register('clientData.email')} className='w-full px-3 py-2 border rounded-md' />
          {errors.clientData?.email && <p className="text-red-500">{errors.clientData.email.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Street Address</label>
          <input {...register('clientData.streetAddress')} className='w-full px-3 py-2 border rounded-md' />
          {errors.clientData?.streetAddress && <p className="text-red-500">{errors.clientData.streetAddress.message}</p>}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2'>
          <div>
            <label className='block mb-1'>City</label>
            <input {...register('clientData.city')} className='w-full px-3 py-2 border rounded-md' />
            {errors.clientData?.city && <p className="text-red-500">{errors.clientData.city.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Post Code</label>
            <input {...register('clientData.postCode')} className='w-full px-3 py-2 border rounded-md' />
            {errors.clientData?.postCode && <p className="text-red-500">{errors.clientData.postCode.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Country</label>
            <input {...register('clientData.country')} className='w-full px-3 py-2 border rounded-md' />
            {errors.clientData?.country && <p className="text-red-500">{errors.clientData.country.message}</p>}
          </div>
        </div>
        {/* Invoice Details */}
        <div className='mb-2'>
          <label className='block mb-1'>Invoice Date</label>
          <Controller
            name="Invoice.invoiceDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={dayjs(field.value)}
                onChange={(date) => setValue('Invoice.invoiceDate', date ? new Date(date) : null)}
                maxDate={dayjs(today)}
                className='w-full px-3 py-2 border rounded-md'
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            )}
          />
          {errors.Invoice?.invoiceDate && <p className="text-red-500">{errors.Invoice.invoiceDate.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Payment Terms</label>
          <select {...register('Invoice.paymentTerms')} className='w-full px-3 py-2 border rounded-md'>
            <option value=""></option>
            <option value="Net 30 Days">Net 30 Days</option>
            <option value="Net 60 Days">Net 60 Days</option>
            <option value="Net 90 Days">Net 90 Days</option>
          </select>
          {errors.Invoice?.paymentTerms && <p className="text-red-500">{errors.Invoice.paymentTerms.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Project Description</label>
          <textarea {...register('Invoice.projectDescription')} className='w-full px-3 py-2 border rounded-md' />
          {errors.Invoice?.projectDescription && <p className="text-red-500">{errors.Invoice.projectDescription.message}</p>}
        </div>
      </div>

      {/* Items */}
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Item List</h3>
        {fields.map((item, index) => (
          <div key={item.id} className='grid grid-cols-1 sm:grid-cols-5 gap-2 mb-2'>
            <div>
              <label className='block mb-1'>Item Name</label>
              <input
                {...register(`Item.${index}.name`)}
                className='w-full px-3 py-2 border rounded-md'
              />
              {errors.Item?.[index]?.name && <p className="text-red-500">{errors.Item[index].name.message}</p>}
            </div>
            <div>
              <label className='block mb-1'>Qty.</label>
              <input
                type='number'
                {...register(`Item.${index}.quantity`, { valueAsNumber: true })}
                className='w-full px-3 py-2 border rounded-md'
              />
              {errors.Item?.[index]?.quantity && <p className="text-red-500">{errors.Item[index].quantity.message}</p>}
            </div>
            <div>
              <label className='block mb-1'>Price</label>
              <input
                type='number'
                {...register(`Item.${index}.price`, { valueAsNumber: true })}
                className='w-full px-3 py-2 border rounded-md'
              />
              {errors.Item?.[index]?.price && <p className="text-red-500">{errors.Item[index].price.message}</p>}
            </div>
            <div>
              <label className='block mb-1'>Total</label>
              <input
                type='number'
                {...register(`Item.${index}.total`, { valueAsNumber: true })}
                className='w-full px-3 py-2 border rounded-md'
                value={watchItems[index]?.quantity * watchItems[index]?.price || 0}
                readOnly
              />
              {errors.Item?.[index]?.total && <p className="text-red-500">{errors.Item[index].total.message}</p>}
            </div>
            <div className='flex items-center justify-center'>
              <button
                type="button"
                className='text-red-500'
                onClick={() => remove(index)}
              >
                <IoTrashBin size={24} />
              </button>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='text-blue-500 mb-4'
          onClick={() =>
            append({
              name: '',
              quantity: 1,
              price: 0,
              total: 0,
            })
          }
        >
          + Add New Item
        </button>
        {errors.Item && <p className="text-red-500">{errors.Item.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
      >
        Save & Send
      </button>
      <button
        type='button'
        className='ml-2 text-gray-500 hover:text-gray-700'
        onClick={controlFormVisibility}
      >
        Discard
      </button>
    </form>
  );
};

export default Form;
