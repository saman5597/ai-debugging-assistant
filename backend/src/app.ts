import express from 'express';
import cors from 'cors';
import debugRoutes from './routes/debug.routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Debugging Assistant API is running',
  });
});

app.use('/api/debug', debugRoutes);

export default app;
