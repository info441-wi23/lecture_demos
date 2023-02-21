import cache from 'memory-cache';
import express from 'express';
var router = express.Router();

// artificially slow down getting the items from the database
// to pretend that this is a really slow, difficult query, so 
// we can see the benefits of caching
async function getItemsSlow(req){
    // get all items from database
    let allItems = await req.models.Item.find()

    // pause for 5 seconds to pretend this was a difficult query
    let sleepSeconds = 5
    await new Promise(r => setTimeout(r, sleepSeconds * 1000))

    return allItems
}


router.get("/", async(req, res) => {
    console.log("got a get request for all items, first checking cache...")

    // check if we already have the answer cached
    let allItems = cache.get('allItems')
    if(allItems){
        console.log("cache hit: found items in my cache")
    }else {
        console.log("cache miss, doing the slow db lookup")
        allItems = await getItemsSlow(req)
        console.log("found items in db, saving to cache")
        cache.put('allItems', allItems, 30*1000)
    }

    // set caching rule for browser
    // res.set('Cache-Control', 'public, max-age=30')
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


async function addPricesToCart(cartInfo, models){
    // cartInfo should look like: [{itemId: 234, itemCount: 2}, {itemId: 53, itemCount: 1}, ...]

    // look up in the db all the items listed in my cart
    let cartItemIds = cartInfo.map(cartItem => cartItem.itemId)
    let itemsInfo = await models.Item.find().where('_id').in(cartItemIds).exec()
    
    // itemsInfo will be an array of json, like this:
    // [{_id: 234, name: "orange", price: ...}, {_id: 53, name: "m&ms", ...}, ...]

    // transform the itemsInfo into an object where I can look up by the id
    let itemsInfoById = {}
    itemsInfo.forEach(itemInfo => {
        itemsInfoById[itemInfo.id] = itemInfo
    })

    // itemsInfById will look like:
    // {
    //    234: {_id: 234, name: "orange", price: ...}
    //    53: {_id: 53, name: "m&ms", ...}
    //    ...
    // }

    // take the cartInfo, and for each item, make a new object with the name and price included
    let combinedCartInfo = cartInfo.map(cartItem => {
        return {
            itemId: cartItem.itemId,
            itemCount: cartItem.itemCount,
            name: itemsInfoById[cartItem.itemId].name,
            price: itemsInfoById[cartItem.itemId].price
        }
    })

    return combinedCartInfo
}


router.get('/getCart', async (req, res) => {
    if(!req.session || !req.session.cartInfo){
        // if there is no session or saved cart, just return empty cart array
        res.json([])
        return
    }

    let cartInfo = JSON.parse(req.session.cartInfo)

    //add item names and prices to the cart info
    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)

    res.json(combinedCartInfo)
})

async function calculateOrderAmount(req){
    let cartInfo = JSON.parse(req.session.cartInfo)

    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)

    let totalCost = combinedCartInfo
        .map(item => item.price * item.itemCount)
        .reduce((prev, curr) => prev + curr)

    return totalCost
}

router.post('/create-payment-intent', async(req, res) => {
    // Look up order amount
    let orderAmount = await calculateOrderAmount(req)

    // create a PaymentIntent object with order amount
    const paymentIntent = await req.stripe.paymentIntents.create({
        amount: orderAmount * 100,
        currency: "usd", // but actually US cents for some reason
        automatic_payment_methods: {
            enabled: true
        }
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })

})


export default router;
