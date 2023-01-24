import express from 'express';
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send("TODO: Find people in database")
});
  

export default router;
