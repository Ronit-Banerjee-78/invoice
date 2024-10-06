import express from "express";
import {
  deleteInvoice,
  getInvoices,
  getSingleInvoice,
  postInvoice,
  updateInvoiceStatus,
  updateInvoice,
} from "../Controllers/InvoiceController.js";
import { UserAuthMiddleware } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// Apply UserAuthMiddleware to all invoice routes
router.use(UserAuthMiddleware);

// GET invoices
router.get("/", getInvoices);

// GET Single invoice
router.get("/:id", getSingleInvoice);

// POST invoices
router.post("/", postInvoice);

// PATCH invoices
router.patch("/:id", updateInvoiceStatus);

// PUT invoices
router.put("/:id", updateInvoice);

// DELETE Invoice
router.delete("/:id", deleteInvoice);

export default router;
