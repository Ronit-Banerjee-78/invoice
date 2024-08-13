import { Invoice } from '../models/Invoice.model.js';
import { Organization } from '../models/Organization.model.js';
import { Client } from '../models/Client.model.js';

// GET Invoices
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({})
            .populate('client')
            .populate('organization')
        return res.json(invoices);
    } catch (error) {
        return res.status(500).json({ message: 'Error while fetching the data', error: error.message });
    }
};

export const getSingleInvoice = async (req, res) => {
  if(!req.params) return res.status(404).json({message : `Error while finding Invoice for requested Id`})
    try {
        const {id} = req.params
        const invoice = await Invoice.findById(id)
            .populate('client')
            .populate('organization')
        return res.status(200).json(invoice);
    } catch (error) {
        return res.status(500).json({ message: 'Error while fetching the data', error: error.message });
    }
};


// POST Invoice
export const postInvoice = async (req, res) => {
    try {
        const {
            clientData,
            organizationData,
            invoiceDate,
            paymentTerms,
            projectDescription,
            items,
            status
        } = req.body;

        // Create and save new Client
        const client = new Client(clientData);
        await client.save();

        // Create and save new Organization
        const organization = new Organization(organizationData);
        await organization.save();

        // Create and save new Invoice
        const invoice = new Invoice({
            client: client._id,
            organization: organization._id,
            invoiceDate,
            paymentTerms,
            projectDescription,
            items,
            status
        });

        await invoice.save();

        res.status(201).json({ message: 'Invoice created successfully', invoice });
    } catch (error) {
        res.status(500).json({ message: 'Error creating invoice', error: error.message });
    }
};


// UPDATE Invoice

export const updateInvoice = async (req, res) => {
  try {
    console.log(req.body) // facing the issue over here where the i'm getting the actual updated body in req but unable to update the data in db and eventually failing to update the UI.
    const { id } = req.params; 
    const updateData = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, {new: true});

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE Invoice
export const deleteInvoice = async (req, res) => {

  const {id} = req.params
  if (!req.params.id) {
    return res.status(400).json({ message: 'Please provide the Invoice ID to delete' });
  }

  try {
        const invoice = await Invoice.findById(id).exec();
        console.log(invoice)
        const {client , organization} = invoice
        // Delete Invoice , Client & Organization
        await Client.findByIdAndDelete(client);
        await Organization.findByIdAndDelete(organization);
        await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice Deleted' });
  } catch (error) {
    res.status(500).json({ message: `Error occurred while deleting invoice: ${error}` });
  }
}