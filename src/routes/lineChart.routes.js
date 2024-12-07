// src/routes/lineChart.routes.js
import { Router } from 'express';
import { getLineChartData } from '../controllers/lineChart.controller.js';
import { updateLineChartData } from '../controllers/lineChart.controller.js';

const router = Router();

// Ruta para obtener los datos del gráfico
router.get('/line-chart-data', getLineChartData);

// Ruta para actualizar los datos del gráfico
router.post('/line-chart-data-update', updateLineChartData);

export default router;

