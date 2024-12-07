// src/routes/pieChart.routes.js
import express from 'express';
import { getPieChartData, updatePieChartData } from '../controllers/pieChart.controller.js';

const router = express.Router();

// Ruta para obtener los datos del Pie Chart
router.get('/pie-chart-data', getPieChartData);

// Ruta para actualizar los datos del Pie Chart
router.post('/pie-chart-data-update', updatePieChartData);

export default router;
