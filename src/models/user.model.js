import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["paciente", "psicologo", "admin"],
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
  },
  bio: { type: String, default: "" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Solo para psicólogos
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Opiniones recibidas
  experiencie: { type: String}, // Solo para psicólogos
  specialties: [{ type: String }], // Solo para psicólogos

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
