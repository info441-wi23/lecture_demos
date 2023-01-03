console.log("hello world")

let years = 1
let days = years * 365
let hours = days * 24
let minutes = hours * 60

console.log("There are " + minutes + " minutes in a year")

// note these three ways of writing functions are equivalent

function example_function(a, b) {
  return a + b;
}

let example_function = function(a, b) {
    return a + b;
}

let example_function = (a, b) => {
    return a + b
}