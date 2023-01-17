// Template Strings demo
let title = "This page"
let subtitle = "this is an example page"
let description = undefined

// first normal strings
let html = "<html><body>" + 
           "<h1>" + title + "</h1>" +
           "<h2>" + subtitle + "</h2>" +
           "<p>" + description + "</p>" +
           "</body></html>"

console.log(html)

let html2 = `
<html>
<body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <p>${description}</p>
</body>
</html>
`

console.log(html2)

//ternary operator

let html3 = `
<html>
<body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <p>${description ? description : ""}</p>
</body>
</html>
`

console.log(html3)

function descriptionHtml(description){
    if(description){
        return `<p>${description}</p>`
    }else{
        return ""
    }
}

let html4 = `
<html>
<body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    ${descriptionHtml(description)}
</body>
</html>
`

console.log(html4)


// Iterators demo
let arr = [
    "first name : Kyle",
    "last name : Thayer",
    "age : 38",
    "glasses : yes"
]

// forEach runs a function on each item in an object/array
// we will use it to exptrat the values into an object
let values = {}
arr.forEach(item => {
    let split_item = item.split(" : ")
    values[split_item[0]] = split_item[1]
})

console.log(values)

// "map" creates a modified version of an array
// the new array has values that are the result of running
// a function on the items in the original array

// map demo 1: replace the ":" with "="
let modifiedArr = arr.map(item => {
    return item.replace(":", "=")
})
console.log(modifiedArr)

// map demo 2: just get the first part (key) of each string
let modifiedArr2 = arr.map(item => {
    return item.split(" : ")[0]
})
console.log(modifiedArr2)

// filter goes through the array and makes a new array
// with only the items that passed the given function (returned true)
let filteredArr = arr.filter(item => {
    if(item.includes("name")){
        return true
    } else {
        return false
    }
})
console.log(filteredArr)

//we can "chain" these commands together
let filteredArr2 = arr
        .filter(item => item.includes("name"))
        .map(item => item.replace(":", "="))
        
console.log(filteredArr2)