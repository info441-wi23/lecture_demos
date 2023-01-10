import {promises as fs} from 'fs'
import fetch from 'node-fetch'
import parser from 'node-html-parser'
import express from 'express'
const app = express()

app.get('/', async (req, res) => {
    console.log("request to '/', sending back html")
    res.type("html")
    let fileContents = await fs.readFile("index.html")
    res.send(fileContents)
})

app.get('/style.css', async (req, res) => {
    console.log("request to '/style.css', sending back css content")
    res.type("css")
    let fileContents = await fs.readFile("style.css")
    res.send(fileContents)
})

app.get('/index.js', async (req, res) => {
    console.log("request to '/index.js', sending back js content")
    res.type("js")
    let fileContents = await fs.readFile("index.js")
    res.send(fileContents)
})

app.get('/api/auditurl', async (req, res) => {
    let url = req.query.url
    console.log("request to '/api/auditurl' for " + url)

    // fetch html from url
    let response = await fetch(url)
    let pageText = await response.text()

    // parse html
    let htmlPage = parser.parse(pageText)

    // check image tags
    let imgTags = htmlPage.querySelectorAll("img")

    let responseHtml = ""
    for(let i = 0; i < imgTags.length; i++){
        let imgTag = imgTags[i]

        responseHtml += "<h3>Image " + i + " info:</h3>"
        responseHtml += "<p>alt text: " + imgTag.attributes.alt + "</p>"
        responseHtml += "<p>img src: " + imgTag.attributes.src + "</p>"
        responseHtml += "<hr>"
    }

    // return results

    res.type("html")
    res.send(responseHtml)
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})