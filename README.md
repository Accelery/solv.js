# Solv.js 💡

[![npm badge][2]][1]
![Unit Tests](https://github.com/Accelery/solv.js/workflows/Unit%20Tests/badge.svg?branch=master)

Solv.js finds the right input value to a function for a predefined output value. It uses the [Steffensen's Method](https://en.wikipedia.org/wiki/Steffensen%27s_method).

## Install

```shell
npm i --save solv.js
```

## Parameters

The method signature is as follows:

```js
solve(
    func: (x: number) => number,
    goal: number = 0,
    guess: number = 0, // A guess to speed up the process
    precision: number = 0.01, // Absolute acceptable difference with goal
    maxIterations: number = 100, // Maximum number of iteration before it fails to converge
): number
```

All function parameters are optional except the `func` parameter.

## Usage

### Javascript

```js
// Import the solve function.
var SolvJS = require('solv.js');

// Examples:
var solution1 = SolvJS.solve((x) => x + 7); // -7
var solution2 = SolvJS.solve((x) => x * x + 5 * x + 6); // -1.9995882538671066
var solution3 = SolvJS.solve((x) => x * x + 5 * x + 6, 0, -3); // -3
var solution4 = SolvJS.solve((x) => x * x + 5 * x + 6, 0, 0, Math.pow(10, -9)); // -1.9999999999997717

// A more elaborate example
function costPizzas(meetingParticipants) {
  const numberOfPizzas = Math.ceil(meetingParticipants / 4);
  const pricePerPizza = numberOfPizzas < 4 ? 20.95 : 20.95 * 0.9;
  return numberOfPizzas * pricePerPizza;
}
function costDrinks(meetingParticipants) {
  return meetingParticipants * 4.5;
}

function costMeeting(meetingParticipants) {
  return costPizzas(meetingParticipants) + costDrinks(meetingParticipants);
}
const meetingParticipantsFor250 = SolvJS.solve(costMeeting, 250);

var error1 = SolvJS.solve((x) => 'Hello there'); // Throws an error
var error2 = SolvJS.solve((x) => x * x, -1); // Throws an error
```

### Typescript

```ts
// Import the solve function.
import { solve } from 'solv.js';

// Examples:
const solution1 = solve((x) => x + 7); // -7
const solution2 = solve((x) => x * x + 5 * x + 6); // -1.9995882538671066
const solution3 = solve((x) => x * x + 5 * x + 6, 0, -3); // -3
const solution4 = solve((x) => x * x + 5 * x + 6, 0, 0, Math.pow(10, -9)); // -1.9999999999997717

// A more elaborate example
const costPizzas = (meetingParticipants: number) => {
  const numberOfPizzas = Math.ceil(meetingParticipants / 4);
  const pricePerPizza = numberOfPizzas < 4 ? 20.95 : 20.95 * 0.9;
  return numberOfPizzas * pricePerPizza;
};
const costDrinks = (meetingParticipants: number) => meetingParticipants * 4.5;
const costMeeting = (meetingParticipants: number) => {
  return costPizzas(meetingParticipants) + costDrinks(meetingParticipants);
};
const meetingParticipantsFor250 = solve(costMeeting, 250); // 26.225555555555548

const error1 = solve((x) => 'Hello there'); // Throws an error
const error2 = solve((x) => x * x, -1); // Throws an error
```

## Credits

This package is inspired by the package [goal-seek](https://www.npmjs.com/package/goal-seek).

[1]: https://npmjs.org/package/solv.js
[2]: https://nodei.co/npm/solv.js.png?compact=true
