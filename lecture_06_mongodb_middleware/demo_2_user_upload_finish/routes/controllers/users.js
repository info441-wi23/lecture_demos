import {promises as fs} from 'fs'
import express from 'express';
var router = express.Router();


router.post('/', async (req, res) => {
  console.log(req.body)

  const newUser = new req.models.User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    favorite_ice_cream: req.body.favorite_ice_cream
  })

  await newUser.save()

  res.send("success")
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let allUsers = await req.models.User.find()
  console.log(allUsers)
  res.json(allUsers)
});

export default router;
