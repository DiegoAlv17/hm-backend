import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/admin",adminRouter);
app.use("/api",authRoutes);


export default app;