const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

const authenticationRoute  = require('./Routes/authentication');
const sendDataRoute = require('./Routes/postData');


app.use(express.json());
app.use('/api/user', authenticationRoute);
app.use('/api/send', sendDataRoute);

app.get('/', (request, response) => {
    response.send("hello world");
})

mongoose.connect( process.env.database,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!"));


app.listen(3000, () => console.log("API started successfully!"));