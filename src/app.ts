import express, { Request, Response, Application } from 'express';
import cors from "cors";
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes';
import { errorHandler } from './middlewares/apiErrorHandler';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

// Register movie routes
app.use("/api/movies", movieRoutes);

// Basic route to check if the server is running
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.use(errorHandler); 

export default app;