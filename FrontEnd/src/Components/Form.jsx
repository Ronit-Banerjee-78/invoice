import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Form = ({isFormVisible , controlFormVisibility}) => {
  const [isVisible] = useState(isFormVisible)
  console.log(isVisible)

  const handleForm = (isVisible) => {
    controlFormVisibility(!isVisible)
  }


  const { register, handleSubmit, control } = useForm({
    defaultValues: {
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
        paymentTerms: 'Net 30 Days',
        projectDescription: '',
      },
      Item: [
        {
          name: '',
          quantity: '',
          price: '',
          total: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Item',
  });

  const onFormSubmit = (data) => {
    console.log(data);
  };

  const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 sticky border-2 border-gray-400 bg-gray-100 w-fit rounded-lg">
      {/* Organization */}
      <div className="Cells Organization mb-6">
        <h3 className="text-lg font-semibold mb-4">Bill From</h3>
        <div className="mb-4">
          <label className="block mb-2">Street Address</label>
          <input
            className="input w-full p-2 border border-gray-300 rounded"
            {...register('Organization.streetAddress')}
          />
        </div>
        <div className="group flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2">City</label>
            <input
              className="input w-full p-2 border border-gray-300 rounded"
              {...register('Organization.city')}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2">Post Code</label>
            <input
              className="input w-full p-2 border border-gray-300 rounded"
              {...register('Organization.postCode')}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2">Country</label>
            <input
              className="input w-full p-2 border border-gray-300 rounded"
              {...register('Organization.country')}
            />
          </div>
        </div>
      </div>

      {/* Client */}
      <div className="Cells Client mb-6">
        <h3 className="text-lg font-semibold mb-4">Bill To</h3>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            className="input w-full p-2 border border-gray-300 rounded"
            {...register('Client.name')}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            className="input w-full p-2 border border-gray-300 rounded"
            {...register('Client.email')}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Street Address</label>
          <input
            className="input w-full p-2 border border-gray-300 rounded"
            {...register('Client.streetAddress')}
          />
        </div>
        <div className="group flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2">City</label>
            <input
              className="input w-full p-2 border border-gray-300 rounded"
              {...register('Client.city')}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2">Post Code</label>
            <input
              className="input w-full p-2 border border-gray-300 rounded"
              {...register('Client.postCode')}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2">Country</label>
            <input
              className="input w-full p-2 border border-gray-300 rounded"
              {...register('Client.country')}
            />
          </div>
        </div>
        <div className="group flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block mb-2">Invoice Date</label>
            <Controller
              control={control}
              name="Client.invoiceDate"
              render={({ field }) => (
                <DatePicker
                  defaultValue={dayjs(today)}
                  value={field.value ? dayjs(field.value) : null}
                  maxDate={dayjs(today)}
                  onChange={(invoiceDate) => field.onChange(dayjs(invoiceDate).format('YYYY-MM-DD'))}
                  textField={(params) => <input {...params} className="input w-full p-2 border border-gray-300 rounded" />}
                />
              )}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block mb-2">Payment Terms</label>
            <select className="input w-full p-2 border border-gray-300 rounded" {...register('Client.paymentTerms')}>
              <option value="Net 30 Days">Net 30 Days</option>
              <option value="Net 60 Days">Net 60 Days</option>
              <option value="Net 90 Days">Net 90 Days</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Project Description</label>
          <input
            className="input w-full p-2 border border-gray-300 rounded"
            {...register('Client.projectDescription')}
          />
        </div>
      </div>

      {/* Items */}
      <div className="Cells Items mb-6">
        <h3 className="text-lg font-semibold mb-4">Items List</h3>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id} className="group flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/4 px-2 mb-4">
                <label className="block mb-2">Item Name</label>
                <input
                  className="input w-full p-2 border border-gray-300 rounded"
                  {...register(`Item.${index}.name`)}
                />
              </div>
              <div className="w-full md:w-1/4 px-2 mb-4">
                <label className="block mb-2">Qty.</label>
                <input
                  type="number"
                  min={1}
                  className="input w-full p-2 border border-gray-300 rounded"
                  {...register(`Item.${index}.quantity`)}
                />
              </div>
              <div className="w-full md:w-1/4 px-2 mb-4">
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="input w-full p-2 border border-gray-300 rounded"
                  {...register(`Item.${index}.price`)}
                />
              </div>
              <div className="w-full md:w-1/4 px-2 mb-4">
                <label className="block mb-2">Total</label>
                <Controller
                  name={`Item.${index}.total`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      className="input w-full p-2 border border-gray-300 rounded"
                      {...field}
                      value={(fields[index].quantity * fields[index].price).toFixed(2)}
                      readOnly
                    />
                  )}
                />
              </div>
              <div className="w-full md:w-1/4 px-2 mb-4">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            append({
              name: '',
              quantity: '',
              price: '',
              total: '',
            })
          }
          className="w-full my-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Item
        </button>
      </div>

      <div className="buttons flex items-center justify-end">
        <button onClick={() => handleForm()} type="button" className="Cancel px-12 py-3 rounded-full mx-4">
          Cancel
        </button>
        <button type="submit" className="Submit px-12 py-3 rounded-full mx-4 bg-green-500 text-white">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
