import {promises as fs} from 'fs'
import express from 'express';
var router = express.Router();


router.post('/', async (req, res) => {
  console.log(req.body)

  // Save the info
  await fs.writeFile('data/userData.json', JSON.stringify(req.body))
  // Note: This erases and replaces whatever data was there before.
  // In a real application we would want to do better

  res.send("success")
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let userInfo = await fs.readFile("data/userData.json")
  res.type("json")
  res.send(userInfo)
});

export default router;
