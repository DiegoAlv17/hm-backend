// src/controllers/pieChart.controller.js
import PieChartData from '../models/PieChart.model.js';  // Importar el modelo del Pie Chart

// Obtener los datos para el gráfico de pastel
export const getPieChartData = async (req, res) => {
  try {
    const data = await PieChartData.find();  // Obtiene los datos de la base de datos
    res.json(data);  // Envía los datos al frontend en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del gráfico de pastel' });
  }
};

// Actualizar los datos del gráfico de pastel
export const updatePieChartData = async (req, res) => {
  const { specialty, percentage } = req.body;  // Obtener los datos enviados desde el frontend

  try {
    // Buscar el documento de la especialidad y actualizar el valor 'percentage'
    const updatedData = await PieChartData.findOneAndUpdate(
      { specialty },  // Buscar por especialidad
      { percentage },  // Actualizar el porcentaje
      { new: true }  // Devolver el documento actualizado
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Especialidad no encontrada' });
    }

    res.json(updatedData);  // Enviar el dato actualizado al frontend
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del gráfico de pastel' });
  }
};
