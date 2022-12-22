import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
    },
    desc: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    img: {
        type: String,
        required: true,
    },
    prices: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        maxlength: 60,
    },
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);