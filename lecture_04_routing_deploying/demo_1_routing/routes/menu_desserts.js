import express from 'express'
let router = express.Router()

router.get('/', (req, res) => {
    res.send("This should be a list of desserts")
})

router.get('/1', (req, res) => {
    res.send("Chocolate Cake!!")
})


export default router