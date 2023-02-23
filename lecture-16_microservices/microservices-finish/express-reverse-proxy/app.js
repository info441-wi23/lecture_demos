import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import httpProxyMiddleware from 'http-proxy-middleware'
const createProxyMiddleware = httpProxyMiddleware.createProxyMiddleware

import usersRouter from './routes/users.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

app.get('/api/double', createProxyMiddleware({target: 'http://localhost:5000'}))

app.get('/api/square', (req, res) => {
    let num = req.query.num
    let squared = num * num
    res.send("" + squared)
})

app.use('/*', createProxyMiddleware({target: 'http://localhost:4000'}))

export default app;
