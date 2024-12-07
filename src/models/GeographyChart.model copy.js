// src/models/GeographyChartData.js
import mongoose from 'mongoose';

const geographyChartDataSchema = new mongoose.Schema({
  country: { type: String, required: true },    // País (puede ser "Perú", "Chile", etc.)
  region: { type: String, required: true },     // Región (puede ser un área geográfica dentro de un país)
  professionalsCount: { type: Number, required: true },  // Número de profesionales en ese país o región
});

const GeographyChartData = mongoose.model('GeographyChartData', geographyChartDataSchema);

export default GeographyChartData;