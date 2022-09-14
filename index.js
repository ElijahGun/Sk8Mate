const express = require('express');
const appConfig = require('./config.js');

const app = express();

app.get('/', (req, res) => {
    res.send('WOrked!!')
})


app.listen(appConfig.port, ()=> {
    console.log(`listening on port`)
})

