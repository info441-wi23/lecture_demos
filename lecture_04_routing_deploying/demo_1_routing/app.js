import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users.js';
import menuRouter from './routes/menu.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/menu', menuRouter)

//alternately, just in app.js
// app.get('/menu', (req, res) => {
//     res.send("This should be a menu here")
// })

// router.get('/menu/desserts/', (req, res) => {
//     res.send("This should be a list of desserts")
// })

// router.get('/menu/desserts/1', (req, res) => {
//     res.send("Chocolate Cake!!")
// })


export default app;
