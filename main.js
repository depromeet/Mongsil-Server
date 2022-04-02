const express = require('express');
const app = express();

app.get('/test', (req,res) => {
    res.send('success')
})

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});