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
  Organization: z.object({
    streetAddress: z.string().min(6, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(6, "Post Code is required"),
    country: z.string().min(6, "Country is required"),
  }),
  Client: z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.string().email("Invalid email address"),
    streetAddress: z.string().min(6, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(6, "Post Code is required"),
    country: z.string().min(6, "Country is required"),
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
      price: z.number("Price is required"),
      total: z.number("Total is required"),
    })
  ).min(1, "At least one item is required"),
});

const Form = ({ isFormVisible, controlFormVisibility }) => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      Status: {
        value: '',
      },
      Organization: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
      },
      Client: {
        name: '',
        email: '',
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
        invoiceDate: '',
        paymentTerms: '',
        projectDescription: '',
      },
      Item: [
        {
          name: '',
          quantity: 0,
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

      {/* Organization */}
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Bill From</h3>
        <div className='mb-2'>
          <label className='block mb-1'>Street Address</label>
          <input {...register('Organization.streetAddress')} className='w-full px-3 py-2 border rounded-md' />
          {errors.Organization?.streetAddress && <p className="text-red-500">{errors.Organization.streetAddress.message}</p>}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <div>
            <label className='block mb-1'>City</label>
            <input {...register('Organization.city')} className='w-full px-3 py-2 border rounded-md' />
            {errors.Organization?.city && <p className="text-red-500">{errors.Organization.city.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Post Code</label>
            <input {...register('Organization.postCode')} className='w-full px-3 py-2 border rounded-md' />
            {errors.Organization?.postCode && <p className="text-red-500">{errors.Organization.postCode.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Country</label>
            <input {...register('Organization.country')} className='w-full px-3 py-2 border rounded-md' />
            {errors.Organization?.country && <p className="text-red-500">{errors.Organization.country.message}</p>}
          </div>
        </div>
      </div>

      {/* Client */}
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Bill To</h3>
        <div className='mb-2'>
          <label className='block mb-1'>Name</label>
          <input {...register('Client.name')} className='w-full px-3 py-2 border rounded-md' />
          {errors.Client?.name && <p className="text-red-500">{errors.Client.name.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Email</label>
          <input {...register('Client.email')} className='w-full px-3 py-2 border rounded-md' />
          {errors.Client?.email && <p className="text-red-500">{errors.Client.email.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Street Address</label>
          <input {...register('Client.streetAddress')} className='w-full px-3 py-2 border rounded-md' />
          {errors.Client?.streetAddress && <p className="text-red-500">{errors.Client.streetAddress.message}</p>}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2'>
          <div>
            <label className='block mb-1'>City</label>
            <input {...register('Client.city')} className='w-full px-3 py-2 border rounded-md' />
            {errors.Client?.city && <p className="text-red-500">{errors.Client.city.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Post Code</label>
            <input {...register('Client.postCode')} className='w-full px-3 py-2 border rounded-md' />
            {errors.Client?.postCode && <p className="text-red-500">{errors.Client.postCode.message}</p>}
          </div>
          <div>
            <label className='block mb-1'>Country</label>
            <input {...register('Client.country')} className='w-full px-3 py-2 border rounded-md' />
            {errors.Client?.country && <p className="text-red-500">{errors.Client.country.message}</p>}
          </div>
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Invoice Date</label>
          <Controller
            control={control}
            name="Client.invoiceDate"
            render={({ field }) => (
              <DatePicker
                defaultValue={dayjs(today)}
                value={field.value ? dayjs(field.value) : null}
                maxDate={dayjs(today)}
                onChange={(invoiceDate) => field.onChange(invoiceDate ? invoiceDate.toDate() : null)}
                textField={(params) => <input {...params.inputProps} className='w-full px-3 py-2 border rounded-md' />}
              />
            )}
          />
          {errors.Client?.invoiceDate && <p className="text-red-500">{errors.Client.invoiceDate.message}</p>}
        </div>
        <div className='mb-2'>
          <label className='block mb-1'>Payment Terms</label>
          <select {...register('Client.paymentTerms')} className='w-full px-3 py-2 border rounded-md'>
            <option value=""></option>
            <option value="Net 30 Days">Net 30 Days</option>
            <option value="Net 60 Days">Net 60 Days</option>
            <option value="Net 90 Days">Net 90 Days</option>
          </select>
          {errors.Client?.paymentTerms && <p className="text-red-500">{errors.Client.paymentTerms.message}</p>}
        </div>
        <div className='mb-4'>
          <label className='block mb-1'>Project Description</label>
          <input {...register('Client.projectDescription')} className='w-full px-3 py-2 border rounded-md' />
          {errors.Client?.projectDescription && <p className="text-red-500">{errors.Client.projectDescription.message}</p>}
        </div>
      </div>

      {/* Item List */}
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Item List</h3>
        {fields.map((field, index) => (
          <div key={field.id} className='mb-2 border-solid shadow-lg border-black p-4'>
            <div className='sm:col-span-2'>
              <label className='block mb-1'>Item Name</label>
              <input {...register(`Item.${index}.name`)} className='w-full px-3 py-2 border rounded-md' />
              {errors.Item?.[index]?.name && <p className="text-red-500">{errors.Item[index].name.message}</p>}
            </div>
            <div>
              <label className='block mb-1'>Qty.</label>
              <input 
                type="number"
                {...register(`Item.${index}.quantity`, { valueAsNumber: true })}
                className='w-full px-3 py-2 border rounded-md'
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setValue(`Item.${index}.quantity`, value);
                  setValue(`Item.${index}.total`, value * watchItems[index]?.price);
                }}
              />
              {errors.Item?.[index]?.quantity && <p className="text-red-500">{errors.Item[index].quantity.message}</p>}
            </div>
            <div>
              <label className='block mb-1'>Price</label>
              <input 
                type="number"
                {...register(`Item.${index}.price`, { valueAsNumber: true })}
                className='w-full px-3 py-2 border rounded-md'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setValue(`Item.${index}.price`, value);
                  setValue(`Item.${index}.total`, value * watchItems[index]?.quantity);
                }}
              />
              {errors.Item?.[index]?.price && <p className="text-red-500">{errors.Item[index].price.message}</p>}
            </div>
            <div>
              <label className='block mb-1'>Total</label>
              <input 
                type="number" 
                {...register(`Item.${index}.total`, { valueAsNumber: true })} 
                className='w-full px-3 py-2 border rounded-md' 
                readOnly
              />
              {errors.Item?.[index]?.total && <p className="text-red-500">{errors.Item[index].total.message}</p>}
            </div>
            <div className='flex items-end'>
              <button 
                type="button" 
                onClick={() => remove(index)}
                className={`px-12 py-3 mt-8 mb-3 bg-black text-white mx-auto ${fields.length === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={fields.length === 1}
              >
                <IoTrashBin size={20} />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: '', quantity: 1, price: 0, total: 0 })}
          className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'
        >
          + Add New Item
        </button>
      </div>
      <div className='flex justify-end gap-2'>
        <button
          type="button"
          onClick={controlFormVisibility}
          className='py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
        >
          Cancel
        </button>
        <button
          type="submit"
          className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700'
        >
          Save & Send
        </button>
      </div>
    </form>
  );
};

export default Form;
