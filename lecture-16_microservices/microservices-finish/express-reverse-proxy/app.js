import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import request from 'request';
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



const servers = ['http://localhost:6001', 'http://localhost:6002' ];
let cur_server_index = 0;
app.use('/api/square', (req, res) => {
  try {
  	cur_server_index = (cur_server_index  + 1) % servers.length;
  	req.pipe(request({ url: servers[cur_server_index] + req.originalUrl })).pipe(res);
  } catch (error) {
	console.log("error in /api/square:" + error)
	res.status(500).json({status: "error", error: error});
  }
})




app.use('/*', createProxyMiddleware({target: 'http://localhost:4000'}))

export default app;
