import express from 'express';
import noteRoutes from './noteRoutes';

const router = express.Router();

export default function routes() {
  router.use('/notes', noteRoutes());

  return router;
}