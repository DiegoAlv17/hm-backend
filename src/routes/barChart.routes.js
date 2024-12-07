// src/routes/barChart.routes.js
import { Router } from 'express';
import { getBarChartData } from '../controllers/barChart.controller.js';
import { updateBarChartData } from '../controllers/barChart.controller.js'; 

const router = Router();

// Ruta para obtener los datos del gráfico
router.get('/bar-chart-data', getBarChartData);

// Ruta para actualizar los datos del gráfico
router.post('/bar-chart-data-update', updateBarChartData);

export default router;
