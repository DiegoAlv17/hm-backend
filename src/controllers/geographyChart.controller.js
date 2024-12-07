// src/controllers/geographyChart.controller.js
import GeographyChartData from '../models/GeographyChart.model.js';

// Obtener los datos para el gráfico geográfico
export const getGeographyChartData = async (req, res) => {
  try {
    const data = await GeographyChartData.find();  // Obtiene los datos de la base de datos
    res.json(data);  // Envía los datos al frontend en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del gráfico geográfico' });
  }
};

// Actualizar los datos del gráfico geográfico
export const updateGeographyChartData = async (req, res) => {
  const { country, region, professionalsCount } = req.body;  // Obtener los datos enviados desde el frontend

  try {
    // Buscar el documento del país y la región y actualizar el valor 'professionalsCount'
    const updatedData = await GeographyChartData.findOneAndUpdate(
      { country, region },  // Buscar por país y región
      { professionalsCount },  // Actualizar el professionalsCount
      { new: true }  // Devolver el documento actualizado
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'País y/o región no encontrados' });
    }

    res.json(updatedData);  // Enviar el dato actualizado al frontend
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del gráfico geográfico' });
  }
};

