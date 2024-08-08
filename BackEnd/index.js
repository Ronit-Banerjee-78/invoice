import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Db/connection.js';
const PORT = process.env.PORT

const app = express();

dotenv.config({
    path : './env'
})

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})