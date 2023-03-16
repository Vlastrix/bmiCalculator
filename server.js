
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

function bmiCalculator (bmiCalculated) {
    let interpretation = "";
    if (bmiCalculated < 18.5) {
         interpretation = "Your BMI is " + bmiCalculated + ", so you are underweight.";
    }
    if (bmiCalculated >= 18.5 && bmiCalculated <= 24.9) {
        interpretation = "Your BMI is " + bmiCalculated + ", so you have a normal weight.";
    } 
    if (bmiCalculated > 24.9) {
        interpretation = "Your BMI is " + bmiCalculated + ", so you are overweight.";
    }
    return interpretation;
}

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res) {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const bmiCalculated = Math.round(weight / height**2);
    const bmiExplained = bmiCalculator(bmiCalculated);
    res.send(bmiExplained);
});

app.listen(3000, function() {
    console.log("Server started successfully on port 3000.");
});