import centroModel from "../models/centro.model.js";

export const createCentroDeSalud = async (req, res) => {
  const { nombre, direccion, telefono, correo, especialidad } = req.body;

  try {
    const nuevoCentro = new centroModel({
      nombre,
      direccion,
      telefono,
      correo,
      especialidad,
    });

    await nuevoCentro.save();
    res
      .status(201)
      .json({
        message: "Centro de salud creado con éxito",
        centroDeSalud: nuevoCentro,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al crear el centro de salud",
        error: error.message,
      });
  }
};

export const getCentrosDeSalud = async (req, res) => {
  try {
    const centros = await centroModel.find();
    res.status(200).json(centros);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al obtener los centros de salud",
        error: error.message,
      });
  }
};

export const getCentroDeSaludById = async (req, res) => {
  const { id } = req.params;

  try {
    const centro = await centroModel.findById(id);
    if (!centro) {
      return res.status(404).json({ message: "Centro de salud no encontrado" });
    }
    res.status(200).json(centro);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al obtener el centro de salud",
        error: error.message,
      });
  }
};

export const updateCentroDeSalud = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, correo, especialidad } = req.body;

  try {
    const centro = await centroModel.findByIdAndUpdate(
      id,
      { nombre, direccion, telefono, correo, especialidad },
      { new: true }
    );

    if (!centro) {
      return res.status(404).json({ message: "Centro de salud no encontrado" });
    }

    res
      .status(200)
      .json({
        message: "Centro de salud actualizado con éxito",
        centroDeSalud: centro,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el centro de salud",
        error: error.message,
      });
  }
};

export const deleteCentroDeSalud = async (req, res) => {
  const { id } = req.params;

  try {
    const centro = await centroModel.findByIdAndDelete(id);
    if (!centro) {
      return res.status(404).json({ message: "Centro de salud no encontrado" });
    }

    res.status(200).json({ message: "Centro de salud eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al eliminar el centro de salud",
        error: error.message,
      });
  }
};
