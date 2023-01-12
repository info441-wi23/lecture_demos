import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This should be a list of users');
});

router.get('/1', function(req, res, next) {
  res.send('This should return info about user 1');
});

export default router;
