import {promises as fs} from 'fs'
import express from 'express'
var router = express.Router()

router.get("/pterosaurs", async (req, res) => {
    // load the data file
    const data = await fs.readFile("data/pterosaur.json")

    // convert data to json object
    let pterosaurJson = JSON.parse(data)

    // filter for those that have images
    let filterdPterosaurJson = pterosaurJson.filter(pterosaurEntry => {
        if(pterosaurEntry.img != ""){
            return true
        }{
            return false
        }
    })

    // send the contents back
    res.json(filterdPterosaurJson)
})

export default router