import express from 'express';
import cors from 'cors';
import debugRoutes from './routes/debug.routes';

const app = express();

const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Debugging Assistant API is running',
  });
});

app.use('/api/debug', debugRoutes);

export default app;
