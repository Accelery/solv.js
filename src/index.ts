export * from './bisection';

/**
 *
 *
 * @param {(variable: number) => number} functionToSolveFor
 * @param {number} [targetResult=0]
 * @param {number} [initialGuess=0] A guess to speed up the process
 * @param {number} [precision=0.01] Absolute acceptable difference with goal
 * @param {number} [maxIterations=100] Maximum number of iteration before it fails to converge
 * @returns
 */
export const solve = (
  functionToSolveFor: (variable: number) => number,
  targetResult: number = 0,
  initialGuess: number = 0,
  precision: number = 0.01,
  maxIterations: number = 100,
) => {
  let x0: number = initialGuess;
  let x1: number;
  let f_x0: number;
  let f_x1: number;
  let g_x0: number;

  // Check of guess is already close enough to the goal
  f_x0 = functionToSolveFor(x0);
  if (Math.abs(targetResult - f_x0) < precision) {
    return x0;
  }

  // Iterate to get closer to goal.
  for (let i = 0; i < maxIterations; i++) {
    // Compute value for next point in converging series
    f_x0 = functionToSolveFor(x0) - targetResult;
    g_x0 = (functionToSolveFor(x0 + f_x0) - targetResult - f_x0) / f_x0;
    x1 = x0 - f_x0 / g_x0;
    f_x1 = functionToSolveFor(x1) - targetResult;

    // Check return value type
    if (isNaN(f_x1)) {
      throw Error('Is NaN');
    }

    // Check if p is close enough to the goal
    if (Math.abs(f_x1) < precision) {
      return x1;
    }
    // If not, restart process
    x0 = x1;
  }

  // If no acceptable solution is found, throw FailedToConvergeError
  throw Error('Failed to converge!');
};
