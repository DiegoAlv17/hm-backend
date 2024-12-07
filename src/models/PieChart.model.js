// src/schemas/PieChartData.js
import mongoose from 'mongoose';

// Esquema para los datos del Pie Chart
const pieChartDataSchema = new mongoose.Schema({
  specialty: { type: String, required: true }, // Especialidad (Ejemplo: Psicología, Nutrición, Coaching)
  percentage: { type: Number, required: true }, // Porcentaje de profesionales en esa especialidad
});

// Modelo del Pie Chart Data
const PieChartData = mongoose.model('PieChartData', pieChartDataSchema);

export default PieChartData;
