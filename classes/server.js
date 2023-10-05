import express from "express";
import cors from 'cors';
import telegram from '../routes/tg.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            telegram: '/api/tg'
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors({
            credentials: false,
        }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.telegram, telegram);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run in port ${this.port}`);
        })
    }
}