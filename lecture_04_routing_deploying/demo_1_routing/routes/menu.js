import express from 'express'
let router = express.Router()
import menuDessertsRouter from './menu_desserts.js'


router.get('/', (req, res) => {
    res.send("This should be a menu here")
})

router.use('/desserts', menuDessertsRouter)


export default router