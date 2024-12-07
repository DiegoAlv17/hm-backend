import pacientesModel from "../models/pacientes.model.js";

export const crearPaciente = async (req, res) => {
  try {
    const paciente = new pacientesModel(req.body); // Crear un paciente usando los datos del cuerpo de la solicitud
    await paciente.save(); // Guardar el paciente en la base de datos
    res.status(201).json({ message: "Paciente creado exitosamente", paciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el paciente", error });
  }
};

export const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await pacientesModel.find(); // Obtener todos los pacientes de la base de datos
    res.status(200).json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los pacientes", error });
  }
};

export const obtenerPacientePorId = async (req, res) => {
  const { id } = req.params; // Obtener el id del paciente desde los parámetros de la URL
  try {
    const paciente = await pacientesModel.findById(id); // Buscar el paciente por su ID
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.status(200).json(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el paciente", error });
  }
};

export const actualizarPaciente = async (req, res) => {
  const { id } = req.params; // Obtener el id del paciente desde los parámetros de la URL
  try {
    const paciente = await pacientesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Actualizar el paciente
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Paciente actualizado exitosamente", paciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el paciente", error });
  }
};

export const eliminarPaciente = async (req, res) => {
  const { id } = req.params; // Obtener el id del paciente desde los parámetros de la URL
  try {
    const paciente = await pacientesModel.findByIdAndDelete(id); // Eliminar el paciente
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.status(200).json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el paciente", error });
  }
};
