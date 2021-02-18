// <copyright file="Bisection.cs" company="Math.NET">
// Math.NET Numerics, part of the Math.NET Project
// http://numerics.mathdotnet.com
// http://github.com/mathnet/mathnet-numerics
//
// Copyright (c) 2009-2020 Math.NET
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
// </copyright>

export class Bisection {
  /**
   *
   * @param {(variable: number) => number} functionToSolveFor
   * @param {number} lowerBound
   * @param {number} upperBound
   * @param {number} [accuracy=1e-14]
   * @param {number} [maxIterations=100]
   */
  public static findRoot(
    functionToSolveFor: (variable: number) => number,
    lowerBound: number,
    upperBound: number,
    accuracy: number = 1e-14,
    maxIterations: number = 100,
  ): number {
    let out: { root: number } = { root: 0 };
    if (
      this._tryFindRoot(
        functionToSolveFor,
        lowerBound,
        upperBound,
        accuracy,
        maxIterations,
        out,
      )
    ) {
      return out.root;
    }
    throw new Error(
      'The algorithm has failed, exceeded the number of iterations allowed or there is no root within the provided bounds.',
    );
  }
  private static _tryFindRoot(
    functionToSolveFor: (variable: number) => number,
    lowerBound: number,
    upperBound: number,
    accuracy: number,
    maxIterations: number,
    out: { root: number },
  ): boolean {
    if (accuracy <= 0) {
      throw new Error('Accuracy must be greater than zero.');
    }

    if (upperBound < lowerBound) {
      const t = upperBound;
      upperBound = lowerBound;
      lowerBound = t;
    }

    let fmin: number = functionToSolveFor(lowerBound);
    if (Math.sign(fmin) == 0) {
      out.root = lowerBound;
      return true;
    }

    let fmax: number = functionToSolveFor(upperBound);
    if (Math.sign(fmax) == 0) {
      out.root = upperBound;
      return true;
    }

    out.root = 0.5 * (lowerBound + upperBound);

    // bad bracketing?
    if (Math.sign(fmin) == Math.sign(fmax)) {
      return false;
    }

    for (let i = 0; i <= maxIterations; i++) {
      const froot: number = functionToSolveFor(out.root);

      if (
        upperBound - lowerBound <= 2 * accuracy &&
        Math.abs(froot) <= accuracy
      ) {
        return true;
      }

      if (lowerBound == out.root || upperBound == out.root) {
        // accuracy not sufficient, but cannot be improved further
        return false;
      }

      if (Math.sign(froot) == Math.sign(fmin)) {
        lowerBound = out.root;
        fmin = froot;
      } else if (Math.sign(froot) == Math.sign(fmax)) {
        upperBound = out.root;
        fmax = froot;
      } // Math.Sign(froot) == 0
      else {
        return true;
      }

      out.root = 0.5 * (lowerBound + upperBound);
    }

    return false;
  }
}
