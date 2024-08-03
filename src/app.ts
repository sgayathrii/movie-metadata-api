import express, { Request, Response, Application } from 'express';
import cors from "cors";
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

// For env File
dotenv.config();

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

export default app;