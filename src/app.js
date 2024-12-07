import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import psicologoRouter from './routes/psicologo.routes.js'; 
import pacienteRouter from './routes/paciente.routes.js';
import centroRouter from './routes/centro.routes.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // La URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Los métodos permitidos
    credentials: true, // Permite enviar cookies y credenciales
  };
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin",adminRouter);
app.use("/api",authRoutes);
app.use("/api",psicologoRouter);
app.use("/api",pacienteRouter);
app.use("/api",centroRouter);


export default app;