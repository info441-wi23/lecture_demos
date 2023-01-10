import fetch from 'node-fetch'
import parser from 'node-html-parser'

// load a webpage
let url = "https://ischool.uw.edu"
let response = await fetch(url)
let pageText = await response.text()

console.log(pageText)

// parse the contents
let htmlPage = parser.parse(pageText)

// look for img tag alt text
let imgTags = htmlPage.querySelectorAll("img")
for(let i = 0; i < imgTags.length; i++){
    let imgTag = imgTags[i]

    console.log("Image " + i + " info:")
    console.log("alt text:" + imgTag.attributes.alt)
    console.log("img src:" + imgTag.attributes.src)
    console.log("\n\n")
}