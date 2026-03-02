import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './db/connection';
import authRoutes from './routes/auth';
import requestRoutes from './routes/requests';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

// security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// rate limiter (basic)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

// health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// error handler (should be last)
app.use(errorHandler);

// start
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();