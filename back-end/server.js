const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/cookbook', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const ingredient = require("./ingredient.js");
app.use("/api/ingredient", ingredient.routes);

const step = require("./step.js");
app.use("/api/step", step.routes);

const recipes = require("./recipes.js");
app.use("/api/recipes", recipes.routes);




app.listen(3002, () => console.log('Server listening on port 3002!'));