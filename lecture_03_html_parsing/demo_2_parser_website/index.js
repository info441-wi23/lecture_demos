
async function auditUrl(){
    let url = document.getElementById("urlInput").value
    let response = await fetch("api/auditurl?url=" + url)
    let resultHtml = await response.text()

    document.getElementById("results").innerHTML = resultHtml
}