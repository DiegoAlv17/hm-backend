// src/controllers/lineChart.controller.js
import LineChartData from '../models/LineChart.model.js';

// Función para obtener los datos del gráfico
export const getLineChartData = async (req, res) => {
  try {
    const data = await LineChartData.find(); // Obtén todos los datos
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del gráfico' });
  }
};

// Función para actualizar los datos del gráfico
export const updateLineChartData = async (req, res) => {
  const { month, professionalsCount } = req.body; // Obtenemos los datos del cuerpo de la solicitud

  try {
    // Verificar si ya existe un registro para el mes dado
    let existingData = await LineChartData.findOne({ month });

    if (existingData) {
      // Si existe, actualizamos el número de profesionales
      existingData.professionalsCount = professionalsCount;
      await existingData.save();
      res.json({ message: 'Datos actualizados exitosamente' });
    } else {
      // Si no existe, creamos un nuevo registro
      const newData = new LineChartData({ month, professionalsCount });
      await newData.save();
      res.json({ message: 'Datos añadidos exitosamente' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del gráfico' });
  }
};

