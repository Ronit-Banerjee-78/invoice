import mongoose, { mongo } from "mongoose";

const organizationSchema = new mongoose.Schema(
    {
        streetAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postCode: {
            type: String,
            required: true,
            uppercase: true,
        },
        country: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const organization = mongoose.model('Organization',organizationSchema)