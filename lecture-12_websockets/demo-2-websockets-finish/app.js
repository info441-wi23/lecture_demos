import express from 'express'
import enableWs from 'express-ws'

const app = express()
enableWs(app)

let socketCounter = 1
let allSockets = []

app.ws('/chatSocket', (ws, res) => {
    let mySocketNum = socketCounter
    socketCounter++;
    allSockets.push(ws)

    console.log("user " + mySocketNum + " connected")

    ws.on('message', msg => {
        console.log("msg (user " + mySocketNum + "): " + msg)
        // TODO: Send the message across all the websockets
        // to all the other browsers
        allSockets.forEach( socket => {
            socket.send(mySocketNum + ": " + msg)
        })
    })
})


app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})