import mongoose from 'mongoose'

let models = {}

console.log("connecting to mongoDB")
// TODO: Copy your mongodb connection string here
// and make sure you are connecting to the right database in it
await mongoose.connect('mongodb://localhost:27017/userDemo')
console.log("successfully connected to mongodb")

//Create schemas and models to connect to the mongodb collections
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
})

models.User = mongoose.model('User', userSchema)

console.log('mongoose models created')

export default models