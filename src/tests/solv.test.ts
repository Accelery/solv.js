import { solve } from '../';

test('It should find the solution for the identity function with defaults', () => {
  const solution = solve((x) => x);
  expect(solution).toBe(0);
});

test('It should find the solution for a simple linear function with defaults', () => {
  const solution = solve((x) => x - 7);
  expect(solution).toBe(7);
});

test('It should find the solution for a simple linear function with a goal different than 0', () => {
  const solution = solve((x) => x - 7, 15);
  expect(solution).toBe(22);
});

test('It should find the solution for a quadratic function with defaults', () => {
  const solution = solve((x) => Math.pow(x, 2) + 5 * x + 6);
  expect(solution).toBeCloseTo(-2, 3);
});

test('It should find the solution for a quadratic function with a goal different than 0', () => {
  const solution = solve((x) => Math.pow(x, 2) + 5 * x, -6);
  expect(solution).toBeCloseTo(-2, 3);
});

test('It should find the solution if the guess is a solution', () => {
  const solution = solve((x) => Math.pow(x, 2) + 5 * x + 6, 0, -3);
  expect(solution).toBe(-3);
});

test('It should find the solution for a quadratic function with higher precision', () => {
  const solution = solve((x) => Math.pow(x, 2) + 5 * x + 6, 0, 0, Math.pow(10, -9));
  expect(solution).toBeCloseTo(-2, 9);
});

test('It should throw an error as function does not return a number', () => {
  const returnValue: any = 'Hello World!';
  const solutionFinder = () => solve((x) => returnValue);
  expect(solutionFinder).toThrow();
});

test('It should throw an error as goal outside of domain', () => {
  const solutionFinder = () => solve((x) => x * x, -1);
  expect(solutionFinder).toThrow();
});

test('It should throw an error as precision too high for number of iterations', () => {
  const solutionFinder = () => solve((x) => Math.pow(x, 2) + 5 * x + 6, 0, 0, Math.pow(10, -9), 3);
  expect(solutionFinder).toThrow();
});

test('It should find the right solution to pizzas', () => {
  const costPizzas = (meetingParticipants: number) => {
    const numberOfPizzas = Math.ceil(meetingParticipants / 4);
    const pricePerPizza = numberOfPizzas < 4 ? 20.95 : 20.95 * 0.9;
    return numberOfPizzas * pricePerPizza;
  };
  const costDrinks = (meetingParticipants: number) => meetingParticipants * 4.5;
  const costMeeting = (meetingParticipants: number) => {
    return costPizzas(meetingParticipants) + costDrinks(meetingParticipants);
  };
  const meetingParticipantsFor250 = solve(costMeeting, 250);
  expect(meetingParticipantsFor250).toBeCloseTo(26.225, 2)
})