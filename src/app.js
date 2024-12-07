import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import cors from 'cors';

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


export default app;