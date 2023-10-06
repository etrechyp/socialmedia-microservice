import express from "express";
import cors from 'cors';
import telegram from '../routes/tg.js';
import facebook from '../routes/fb.js'

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            telegram: '/api/tg',
            facebook: '/api/fb'
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
        this.app.use(this.paths.facebook, facebook);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run in port ${this.port}`);
        })
    }
}