import chai from 'chai'
let assert = chai.assert
import request from 'supertest'

// I want  to do an integration test on items,
// making sure it connects to mongodb correctly

// first I need to import app.js so it loads the models and the item router
import app from '../app.js'

describe('Items integration test (with database)', () => {
    
    before(async () => {
        // pause for 4 seconds to make sure the database is connected
        // otherwise tests will fail because database not connected
        return await new Promise(resolve => setTimeout(resolve, 4000))
    })

    it('should get items from the db for GET items request', async () => {
        const res = await request(app).get('/items')

        assert.equal(res.statusCode, 200)
        assert.equal(res.type, "application/json")

        assert.isArray(res.body)
        assert.include(
            res.body[0],
            {
                name: 'orange',
                price: 1.5
            }
        )
    })


})