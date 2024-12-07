// src/schemas/BarChartData.js
import mongoose from 'mongoose';

const barChartDataSchema = new mongoose.Schema({
  category: { type: String, required: true },  // categoría (psicólogos, psiquiatras, etc.)
  count: { type: Number, required: true },     // cantidad de profesionales en esa categoría
});

const BarChartData = mongoose.model('BarChartData', barChartDataSchema);

export default BarChartData;