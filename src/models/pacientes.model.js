import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true, // El campo es obligatorio
    },
    telefono: {
      type: String,
      required: true, // El campo es obligatorio
    },
    edad: {
      type: Number,
      required: true, // El campo es obligatorio
    },
    correo: {
      type: String,
      required: true, // El campo es obligatorio
      unique: true, // El correo debe ser único
      match: [/^\S+@\S+\.\S+$/, "Por favor ingrese un correo válido"], // Validación de formato de correo
    },
    direccion: {
      type: String,
      required: true, // El campo es obligatorio
    },
    ciudad: {
      type: String,
      required: true, // El campo es obligatorio
    },
  },
  {
    timestamps: true, // Esto agregará automáticamente los campos createdAt y updatedAt
  }
);

export default mongoose.model("Paciente", pacienteSchema);
