import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    paymentTerms: {
      type: String,
      enum: ["Net 30 Days", "Net 60 Days", "Net 90 Days"],
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    items: [itemSchema],
    status: {
      type: String,
      enum: ["Draft", "Pending", "Paid"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
