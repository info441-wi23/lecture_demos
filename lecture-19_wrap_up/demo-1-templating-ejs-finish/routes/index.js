var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: We could look up azure session info here
  let username = "<strong>Kyle</strong>"

  // TODO: we could look up info from our database
  let produce = [
    {name: "apple", price: 1.5},
    {name: "orange", price: .75},
    {name: "banana", price: 10}
  ]

  res.render('index', { 
    title: 'Produce Store',
    username: username,
    produce: produce
  });
});

module.exports = router;
