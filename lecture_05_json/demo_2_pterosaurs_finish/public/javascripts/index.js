console.log("creating function")
async function getPterosaurs(){
    console.log("running function")
    // do an ajax call
    let response = await fetch("api/pterosaurs")
    let pterosaurJson = await response.json()

    // turn json into html
    let pterosaurHTML = pterosaurJson.map(onePterosaur => {
        return `
        <div>
            <p>${onePterosaur.Genus}</p>
            <img src="${onePterosaur.img}" />
        </div>
        `
    }).join("")

    // display results
    document.getElementById("results").innerHTML = pterosaurHTML
}