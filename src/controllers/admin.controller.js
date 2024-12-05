import adminModel from "../models/admin.model.js";

export const readAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAdmin = async (req, res) => {
    const admin = req.body;
    const newAdmin = new adminModel(admin);
    try {
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
