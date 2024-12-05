const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const dotenv = require('dotenv').config()

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 
            'POST, GET, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT']})
    .use({ origin: '*' })
    .use("/", require("./routes/index.js"));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () =>{console.log(`Database is listening and node Running on port ${port}`)});
    }
});