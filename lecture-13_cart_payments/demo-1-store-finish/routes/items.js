import express from 'express';
var router = express.Router();

router.get("/", async(req, res) => {
    let allItems = await req.models.Item.find()
    res.json(allItems)
})

router.post('/saveCart', async (req, res) => {
    console.log("saving cart, session currently is:", req.session)

    // an array of {} with itemCount and itemId
    let cartInfo = req.body

    req.session.cartInfo = JSON.stringify(cartInfo)

    console.log("session is now: ", req.session)

    res.json({status: "success"})
})

export default router;
