import express from 'express';
import { deleteInvoice, getInvoices, postInvoice } from '../Controllers/InvoiceControllers.js';

const router = express.Router();

// GET invoices
router.get('/', getInvoices);

// POST invoices
router.post('/', postInvoice);

// DELETE Invoice
router.delete('/', deleteInvoice);

export default router;
