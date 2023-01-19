async function createUser(){
    // get data from html
    let first_name = document.getElementById("first_name_input").value
    let last_name = document.getElementById("last_name_input").value
    let favorite_ice_cream = document.getElementById("favorite_ice_cream_input").value

    let myData = {
        first_name: first_name,
        last_name: last_name,
        favorite_ice_cream: favorite_ice_cream
    }

    // send data to server
    let response = await fetch("api/v1/users", {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


async function getUsers(){
    // do an ajax call
    let response = await fetch("api/v1/users") // default is GET
    let usersJson = await response.json()

   
    // display results
    document.getElementById("results").innerHTML = JSON.stringify(usersJson)
}