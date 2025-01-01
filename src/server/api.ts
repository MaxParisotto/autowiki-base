import express from 'express';
import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const router: Router = express.Router();

// Middleware setup
router.use(cors());
router.use(bodyParser.json());

// Custom API error class
class APIError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

// Global error handler
const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    
    if (err instanceof APIError) {
        res.status(err.statusCode).json({ 
            error: err.message,
            status: 'error'
        });
    } else {
        res.status(500).json({ 
            error: 'Internal Server Error',
            status: 'error'
        });
    }
};

// API Routes
router.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.APP_VERSION || '1.0.0'
    });
});

// Exports
export const api = {
    router,
    errorHandler,
    APIError
};

export default api;