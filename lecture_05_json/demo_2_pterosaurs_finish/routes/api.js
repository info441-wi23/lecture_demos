import {promises as fs} from 'fs'
import express from 'express'
var router = express.Router()

router.get("/pterosaurs", async (req, res) => {
    // load the data file
    const data = await fs.readFile("data/pterosaur.json")

    // send the contents back
    res.type("json")
    res.send(data)
})

export default router