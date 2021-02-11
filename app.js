const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

app.get("/greetings", (req, res) => {
  const name = req.query.name;
  const race = req.query.race;

  if (!name) {
    return res.status(400).send("Please provide a name");
  }

  if (!race) {
    return res.status(400).send("Please provide a race");
  }

  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  res.send(greeting);
});

app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    return res.status(400).send("Please enter a value for 'a'");
  }
  if (!b) {
    return res.status(400).send("Please enter a value for 'b'");
  }

  const sum = parseInt(a) + parseInt(b);
  const sentence = `The sum of ${a} and ${b} is ${sum}.`;

  res.send(sentence);
});

app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if (!text) {
    return res.sendStatus(400).send("Please enter a value for 'text'");
  }
  if (!shift) {
    return res.sendStatus(400).send("Please enter a value for 'shift'");
  }
  const numericalShift = parseInt(shift);

  const cipherText = text
    .toUpperCase()
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      let difference = code - 65;
      difference = difference + numericalShift;

      const shiftedCharacter = String.fromCharCode(65 + difference);
      return shiftedCharacter;
    })
    .join("");

  res.send(cipherText);
});
app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});

app.get("/lotto", (req, res) => {
  const numbers = req.query.numbers;

  if (!numbers) {
    return res.status(400).send("numbers is required");
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).send("numbers must be an array");
  }
  const guesses = numbers
    .map((n) => parseInt(n))
    .filter((n) => !Number.isNaN(n) && n >= 1 && n <= 20);

  if (guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }
  const stockNumbers = Array(20)
    .fill(1)
    .map((_, i) => i + 1);

  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  let diff = winningNumbers.filter((n) => !guesses.includes(n));

  let responseText;

  switch (diff.length) {
    case 0:
      responseText = "Wow! Unbelievable! You could have won the mega millions!";
      break;
    case 1:
      responseText = "Congratulations! You win $100!";
      break;
    case 2:
      responseText = "Congratulations, you win a free ticket!";
      break;
    default:
      responseText = "Sorry, you lose";
  }
  res.send(responseText);
});
