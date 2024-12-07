// src/routes/geographyChart.routes.js
import { Router } from 'express';
import { getGeographyChartData } from '../controllers/geographyChart.controller.js';
import { updateGeographyChartData } from '../controllers/geographyChart.controller.js';

const router = Router();

// Ruta para obtener los datos del gráfico geográfico
router.get('/geography-chart-data', getGeographyChartData);

// Ruta para actualizar los datos del gráfico geográfico
router.post('/geography-chart-data-update', updateGeographyChartData);

export default router;
