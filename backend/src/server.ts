import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import usersRouter from './routes/users';
import marketRouter from './routes/market';
import portfolioRouter from './routes/portfolio';
import authRouter from './routes/auth';
import { fileURLToPath } from 'url';

// Fix: __dirname is not available in ES modules, so we define it manually.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/market', marketRouter);
app.use('/api/portfolio', portfolioRouter);

// Serve frontend for production
if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
  const frontendDistPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');
  app.use(express.static(frontendDistPath));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
