import e from "express";
import citaModel from "../models/cita.model.js";
import userModel from "../models/user.model.js";

export const getCitas = async (req, res) => {
  try {
    const citas = await citaModel.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCita = async (req, res) => {
  try {
    const { pacienteId, psicologoId, fecha, duracion, comentarios } = req.body;

    // Verificar si el paciente y el psicólogo existen en la base de datos
    const paciente = await userModel.findById(pacienteId);
    const psicologo = await userModel.findById(psicologoId);

    if (!paciente || paciente.role !== "paciente") {
      return res.status(400).json({ error: "Paciente no válido" });
    }

    if (!psicologo || psicologo.role !== "psicologo") {
      return res.status(400).json({ error: "Psicólogo no válido" });
    }

    // Crear la nueva cita
    const cita = new Cita({
      paciente: pacienteId,
      psicologo: psicologoId,
      fecha,
      duracion,
      comentarios,
    });

    await cita.save();
    res.status(201).json({ mensaje: "Cita creada con éxito", cita });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al crear la cita. Intenta nuevamente." });
  }
};

export const getCitaPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;

    const citas = await citaModel
      .find({ paciente: pacienteId })
      .populate("psicologo", "name profilePicture") // Poblamos la información del psicólogo
      .exec();

    if (citas.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron citas para este paciente." });
    }

    res.status(200).json({ citas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las citas del paciente." });
  }
};

export const getCitasPsicologo = async (req, res) => {
  try {
    const { psicologoId } = req.params;

    const citas = await citaModel
      .find({ psicologo: psicologoId })
      .populate("paciente", "name profilePicture") // Poblamos la información del paciente
      .exec();

    if (citas.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron citas para este psicólogo." });
    }

    res.status(200).json({ citas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener las citas del psicólogo." });
  }
};

export const updateCitaStatus = async (req, res) => {
  try {
    const { citaId } = req.params;
    const { estado } = req.body;

    if (!["pendiente", "completada", "cancelada"].includes(estado)) {
      return res.status(400).json({
        error: "Estado no válido. Debe ser pendiente, completada o cancelada.",
      });
    }

    const cita = await citaModel.findByIdAndUpdate(
      citaId,
      { estado },
      { new: true } // Devuelve el documento actualizado
    );

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    res
      .status(200)
      .json({ mensaje: "Estado de cita actualizado con éxito", cita });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el estado de la cita." });
  }
};

export const deleteCita = async (req, res) => {
  try {
    const { citaId } = req.params;

    const cita = await citaModel.findByIdAndDelete(citaId);

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    res.status(200).json({ mensaje: "Cita eliminada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la cita." });
  }
};
