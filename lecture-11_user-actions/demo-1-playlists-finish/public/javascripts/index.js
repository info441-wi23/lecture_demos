
async function addUser(){
    let name = document.getElementById("name_input").value

    await fetch("/api/v1/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: name})
    })
}

async function loadUsers(){
    document.getElementById("allusersdiv").innerText = "loading..."

    let response = await fetch("/api/v1/users")
    let usersJson = await response.json()

    let usersHTML = usersJson.map(userInfo => {
        return `
        <hr>
        <div>
            <h3>Username: ${userInfo.username}</h3>
            <strong>Favorite Bands:</strong> ${userInfo.favorite_bands.join(", ")} <br>
            <strong>Add Band:</strong> <input type="text" id="add_band_text_${userInfo._id}" />
            <button onclick="addBand('${userInfo._id}')">Add Band</button>
        </div>
        `
    }).join("<hr>")

    document.getElementById("allusersdiv").innerHTML = usersHTML 
}

async function addBand(id){
    let bandToAdd = document.getElementById("add_band_text_" + id).value

    await fetch("/api/v1/users/bands", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: id,
            band: bandToAdd
        })
    })
}