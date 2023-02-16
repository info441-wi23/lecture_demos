import chai from 'chai'
let assert = chai.assert
import request from 'supertest'

// I want to test app.js, so I import it here
import app from '../app.js'

describe('Static Server', () => {
    it('should return index.html if "/" requested', async() => {
        const res = await request(app).get("/")

        
    })
})