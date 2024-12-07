import psicologoModel from "../models/psicologo.model.js";

export const crearPsicologo = async (req, res) => {
  try {
    const { nombre, edad, telefono, correo, especialidad } = req.body;

    // Verificar si el correo ya existe
    const existeCorreo = await psicologoModel.findOne({ correo });
    if (existeCorreo) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Crear el nuevo psicólogo
    const psicologo = new psicologoModel({
      nombre,
      edad,
      telefono,
      correo,
      especialidad,
    });
    await psicologo.save();

    res
      .status(201)
      .json({ message: "Psicólogo creado exitosamente", psicologo });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el psicólogo", error });
  }
};

// Obtener todos los psicólogos
export const obtenerPsicologos = async (req, res) => {
  try {
    const psicologos = await psicologoModel.find();
    res.status(200).json({ psicologos });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los psicólogos", error });
  }
};

// Obtener un psicólogo por su ID
export const obtenerPsicologoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const psicologo = await psicologoModel.findById(id);

    if (!psicologo) {
      return res.status(404).json({ message: "Psicólogo no encontrado" });
    }

    res.status(200).json({ psicologo });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el psicólogo", error });
  }
};

// Actualizar un psicólogo por su ID
export const actualizarPsicologo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, telefono, correo, especialidad } = req.body;

    const psicologo = await psicologoModel.findByIdAndUpdate(
      id,
      { nombre, edad, telefono, correo, especialidad },
      { new: true }
    );

    if (!psicologo) {
      return res.status(404).json({ message: "Psicólogo no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Psicólogo actualizado exitosamente", psicologo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el psicólogo", error });
  }
};

// Eliminar un psicólogo por su ID
export const eliminarPsicologo = async (req, res) => {
  try {
    const { id } = req.params;
    const psicologo = await psicologoModel.findByIdAndDelete(id);

    if (!psicologo) {
      return res.status(404).json({ message: "Psicólogo no encontrado" });
    }

    res.status(200).json({ message: "Psicólogo eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el psicólogo", error });
  }
};
