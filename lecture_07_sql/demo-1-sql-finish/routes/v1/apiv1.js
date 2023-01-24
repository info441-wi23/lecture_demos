import peopleRouter from './controllers/people.js';
import express from 'express';
var router = express.Router();

router.use('/people', peopleRouter)

export default router;