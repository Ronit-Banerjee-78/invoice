import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Db/connection.js';
const PORT = process.env.PORT
import InvoiceRoutes from './Routes/InvoiceRoutes.js'
import cors from 'cors'

const app = express();

// middleware

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your front-end origin
}));
app.use(express.json())

dotenv.config({
    path : './env'
})

// routes middleware
app.use('/api/invoices',InvoiceRoutes)

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})