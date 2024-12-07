// src/models/LineChartData.js
import mongoose from 'mongoose';

// Esquema que representará los datos del gráfico
const lineChartDataSchema = new mongoose.Schema({
  month: { 
    type: String,  // Mes del año, por ejemplo: "January", "February", ...
    required: true 
  },
  professionalsCount: { 
    type: Number, // Número de profesionales registrados en ese mes
    required: true 
  },
});

const LineChartData = mongoose.model('LineChartData', lineChartDataSchema);

export default LineChartData;
