import express from 'express';
import { deleteInvoice, getInvoices, getSingleInvoice, postInvoice  , updateInvoice} from '../Controllers/InvoiceControllers.js';

const router = express.Router();

// GET invoices
router.get('/', getInvoices);

// GET Single invoice
router.get('/:id', getSingleInvoice);

// POST invoices
router.post('/', postInvoice);

// PATCH invoices
router.patch('/:id', updateInvoice);

// DELETE Invoice
router.delete('/:id', deleteInvoice);

export default router;
