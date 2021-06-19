const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 5000000
    }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
    },
    /*
    tags: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tags'
    },
    */
    title: String,
    author: String,
    path: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// upload recipe
router.post("/", validUser, upload.single('photo'), async (req, res) => {
    try {
    // check parameters
        if (!req.file) {
            const recipe = new Recipe({
                path: "",
                title: req.body.title,
                author: req.body.author,

            });
            await recipe.save();
            await res.send(recipe);
            return;
        }
        else {
            const recipe = new Recipe({
                path: "/images/" + req.file.filename,
                title: req.body.title,
                author: req.body.author,
            });
            await recipe.save();
            await res.send(recipe);
            return;
        }
    
        
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my photos
router.get("/", async (req, res) => {
    // return recipes
    try {
        let result = await Recipe.find();
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let result = await Recipe.findOne({ _id: req.params.id });
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
router.put("/:id", upload.single('photo'), async (req, res) => {
    try {
        let result = await Recipe.findOne({ _id: req.params.id });
        if (req.body.title) {
            result.title = req.body.title;
        }
        if (req.body.author) {
            result.author = req.body.author;
        }
        if (req.file) {
            result.path = "/images/" + req.file.filename;
        }
        result.save()
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Recipe,
    routes: router,
}

