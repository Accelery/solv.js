export const solve = (
  func: (variable: number) => number,
  goal: number = 0,
  precision: number = 0.01,
  maxIterations: number = 100,
  guess: number = 0,
) => {
  let x0: number = guess;
  let x1: number;
  let f_x0: number;
  let f_x1: number;
  let g_x0: number;

  // Check of guess is already close enough to the goal
  f_x0 = func(x0);
  if (Math.abs(goal - f_x0) < precision) {
    return f_x0;
  }

  // Iterate to get closer to goal.
  for (let i = 0; i < maxIterations; i++) {
    // Compute value for next point in converging series
    f_x0 = func(x0);
    g_x0 = func(x0 + f_x0) / f_x0 - 1;
    x1 = x0 - f_x0 / g_x0;
    f_x1 = func(x1);

    // Check return value type
    if (isNaN(f_x1)) {
      throw Error('Is NaN');
    }

    // Check if p is close enough to the goal
    if (Math.abs(goal - f_x1) < precision) {
      return x1;
    }
    // If not, restart process
    x0 = x1;
  }

  // If no acceptable solution is found, throw FailedToConvergeError
  throw Error('Failed to converge!');
};