import mongoose from "mongoose";

const centroSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      match: /^[0-9]{9}$/, // Validación para un teléfono de 9 dígitos
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Por favor ingrese un correo electrónico válido",
      ], // Validación de correo
    },
    especialidad: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Añadir los campos createdAt y updatedAt automáticamente
);

export default mongoose.model("Centro", centroSchema);
