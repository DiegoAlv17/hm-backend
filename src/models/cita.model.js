import mongoose from "mongoose";
const citaSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Referencia al modelo de Usuario
      required: true,
    },
    psicologo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Referencia al modelo de Usuario
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    duracion: {
      type: Number, // Duración en minutos
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "completada", "cancelada"],
      default: "pendiente",
    },
    comentarios: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cita", citaSchema);