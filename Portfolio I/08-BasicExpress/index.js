const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/bmicalculator', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || height === 0) {
    return res.send("Please enter valid numbers for weight and height, and height cannot be zero.");
  }

  const bmi = (weight / (height * height)) * 10000;

  res.send(`Your BMI is: ${bmi.toFixed(2)}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Open your browser at http://localhost:${port}`);
});