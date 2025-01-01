import express from 'express';
import { Router } from 'express';
import cors from 'cors';

const router: Router = express.Router();

// Basic error handling middleware
const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

// Configure API routes
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Export router for use in main application
export const api = {
    router,
    errorHandler,
};

export default api;