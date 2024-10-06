import { Invoice } from "../models/Invoice.model.js";
import { Organization } from "../models/Organization.model.js";
import { Client } from "../models/Client.model.js";
import jwt from "jsonwebtoken";

// GET Invoices
export const getInvoices = async (req, res) => {
  try {
    // console.log("Authorization header:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    // console.log("Decoded ", decoded);
    const userId = decoded._id;
    // console.log("User ID from controller", userId);

    const invoices = await Invoice.find({
      createdBy: userId,
    })
      .populate("client")
      .populate("organization");
    // console.log("-----------------------------------------------------");
    // console.log("Invoices", invoices);
    return res.json(invoices);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the data", error: error.message });
  }
};

export const getSingleInvoice = async (req, res) => {
  if (!req.params)
    return res
      .status(404)
      .json({ message: `Error while finding Invoice for requested Id` });
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate("client")
      .populate("organization");
    return res.status(200).json(invoice);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the data", error: error.message });
  }
};

// POST Invoice
export const postInvoice = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    // console.log("Decoded ", decoded);
    const userId = decoded._id;
    // console.log("User ID", userId);
    const {
      clientData,
      organizationData,
      invoiceDate,
      paymentTerms,
      projectDescription,
      items,
      status,
    } = req.body;

    // Create and save new Client
    const client = new Client({
      ...clientData, // spread the incoming clinetData object
      createdBy: userId, // add createdBy separately
    });

    await client.save();

    // Create and save new Organization
    const organization = new Organization({
      ...organizationData,
      createdBy: userId,
    });

    await organization.save();

    // Create and save new Invoice
    const invoice = new Invoice({
      client: client._id,
      organization: organization._id,
      invoiceDate,
      paymentTerms,
      projectDescription,
      items,
      status,
      createdBy: userId,
    });

    console.log("Invoice Added", invoice);

    await invoice.save();

    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: error.message });
  }
};

// UPDATE Invoice Status

export const updateInvoiceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Invoice ID is required" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    // Update only the status of the invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating invoice status", error: error.message });
  }
};

// UPDATE Invoice
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "No data provided" });
    }

    // console.log("Received Updated Data : ", data);

    const {
      organizationData,
      clientData,
      invoiceDate,
      paymentTerms,
      projectDescription,
      status,
      items,
    } = data;

    // Retrieve existing invoice to get client and organization IDs
    const existingInvoice = await Invoice.findById(id)
      .populate("client")
      .populate("organization");
    console.log(existingInvoice);

    const { client, organization, createdBy } = existingInvoice;

    // Update Client and Organization
    const updatedClient = await Client.findByIdAndUpdate(
      client._id,
      { clientData, createdBy },
      { new: true }
    );
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organization._id,
      { organizationData, createdBy },
      { new: true }
    );

    // Update Invoice
    const updatedData = {
      client: updatedClient._id,
      organization: updatedOrganization._id,
      invoiceDate,
      paymentTerms,
      projectDescription,
      items,
      status,
      createdBy,
    };
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // console.log("---------------------------------");

    // console.log("DB Updated Data : ", updateInvoice);

    // console.log("---------------------------------");

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Invoice
export const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: "Please provide the Invoice ID to delete" });
  }

  try {
    const invoice = await Invoice.findById(id).exec();
    // console.log(invoice);
    const { client, organization } = invoice;
    // Delete Invoice , Client & Organization
    await Client.findByIdAndDelete(client);
    await Organization.findByIdAndDelete(organization);
    await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({ message: "Invoice Deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while deleting invoice: ${error}` });
  }
};
