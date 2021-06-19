const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const recipes = require("./recipes.js");
const Recipe = recipes.model;
const vaildRecipe = recipes.valid;

const stepSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.ObjectId,
        ref: 'Recipe'
    },
    stepNumber: Number,
    step: String,

});

const Step = mongoose.model('Step', stepSchema);

// add step
router.post("/:id", async (req, res) => {
    try {
        let recipe = await Recipe.findOne({
            _id: req.params.id
        });

        const step = new Step({
            recipe: recipe,
            step: req.body.step,
            stepNumber: req.body.stepNumber,
        });
        await step.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

});

// get steps
router.get("/:id", async (req, res) => {
    try {
        let steps = await Step.find({
            recipe: req.params.id
        }).sort({
            stepNumber: 1
        })
        return res.send(steps);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let step = await Step.deleteOne({
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
        let step = await Step.findOne({
            _id: req.params.id
        });
        step.step = req.body.step;
        step.stepNumber = req.body.stepNumber;
        step.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


module.exports = {
    model: Step,
    routes: router,
}