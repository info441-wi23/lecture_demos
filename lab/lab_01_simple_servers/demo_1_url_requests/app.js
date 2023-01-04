const express = require('express');
const app = express();

//req.url: shows everything
//req.path: shows path no query
//req.query: shows all query parameter
//req.query.<keyword>: shows keyword

app.get('*', (req, res) => {
    console.log(req.url);
    res.send('you request the url: ' + req.url);
})

app.listen(3000, () => {
    console.log('example running on port 3000')
})

