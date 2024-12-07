// src/controllers/barChart.controller.js
import BarChartData from '../models/BarChart.model.js';

// Obtener los datos para el gráfico
export const getBarChartData = async (req, res) => {
  try {
    const data = await BarChartData.find();  // Obtiene los datos de la base de datos
    res.json(data);  // Envía los datos al frontend en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del gráfico' });
  }
};

// Actualizar los datos del gráfico
export const updateBarChartData = async (req, res) => {
  const { category, count } = req.body;  // Obtener los datos enviados desde el frontend

  try {
    // Buscar el documento de la categoría y actualizar el valor 'count'
    const updatedData = await BarChartData.findOneAndUpdate(
      { category },  // Buscar por categoría
      { count },     // Actualizar el count
      { new: true }  // Devolver el documento actualizado
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(updatedData);  // Enviar el dato actualizado al frontend
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del gráfico' });
  }
};