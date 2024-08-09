import { Invoice } from '../models/Invoice.model.js';

// GET Invoices
export const getInvoices =  async (req, res) => {
    try {
        let Response =await Invoice.find({})
        return res.json(Response)
    } catch (error) {
        return res.status(500).json({ message: 'Error while fetching the data', error: error.message });
    }
}

// POST Invoices
export const postInvoice =  async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Please Provide Required Inputs to submit Invoice' });
    }
    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        return res.status(201).json(newInvoice);
    } catch (error) {
        return res.status(400).json({ message: 'Error occurred while creating invoice', error: error.message });
    }
}

// DELETE Invoice
export const deleteInvoice =  async (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).json({ message: 'Please Provide Required Inputs to delete Invoice' });
    }
    try {
        await Invoice.deleteOne(req.body)
        res.json({message : 'Invoice Deleted'})
    } catch (error) {
        res.status(500).json({message : `Error occured while deleting invoice : ${error}`})
    }
}