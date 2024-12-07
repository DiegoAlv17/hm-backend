import mongoose from "mongoose";

const psicologoSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true,
      unique: true
    },
    especialidad: {
      type: String,
      required: true
    }
  });

export default mongoose.model('Psicologo', psicologoSchema);