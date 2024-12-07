import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import citasRouter from './routes/citas.routes.js';
import cors from 'cors';

import barChartRoutes from './routes/barChart.routes.js';
import pieChartRoutes from './routes/pieChart.routes.js';
import lineChartRoutes from './routes/lineChart.routes.js';
import geographyChartRoutes from './routes/geographyChart.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // Tu frontend
    credentials: true,  // Permite el envío de cookies
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",userRouter);
app.use("/api",postRouter);
app.use("/api",citasRouter);

app.use("/api/barChart", barChartRoutes);
app.use("/api/pieChart", pieChartRoutes);
app.use("/api/lineChart", lineChartRoutes);
app.use("/api/geographyChart", geographyChartRoutes);



export default app;