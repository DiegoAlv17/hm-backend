import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminName:{
        type: String,
        required: true,
        trim: true
    },
    adminEmail: {
        type: String,
        required: true,
        trim: true
    },
    adminPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['usuario', 'profesional', 'administrador'],
        required: true
    }
})

export default mongoose.model('Admin', adminSchema);