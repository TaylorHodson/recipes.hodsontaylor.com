const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const recipes = require("./recipes.js");
const Recipe = recipes.model;
const vaildRecipe = recipes.valid;

const ingredientSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.ObjectId,
        ref: 'Recipe'
    },
    ingredient: String,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

// add ingredient
router.post("/:id", async (req, res) => {
    try {
        let recipe = await Recipe.findOne({
            _id: req.params.id
        });

        const ingredient = new Ingredient({
            recipe: recipe,
            ingredient: req.body.ingredient,
        });
            await ingredient.save();
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

});

// get ingredients
router.get("/:id", async (req, res) => {
    try {
        let ingredients = await Ingredient.find({
            recipe: req.params.id
        }).sort({
            ingredient: 1
        })
        return res.send(ingredients);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let ingredient = await Ingredient.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.put("/:id", async (req, res) => {
    try {
        let ingredient = await Ingredient.findOne({
            _id: req.params.id
        });
        ingredient.ingredient = req.body.ingredient;
        ingredient.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    model: Ingredient,
    routes: router,
}