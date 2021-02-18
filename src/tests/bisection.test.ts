// <copyright file="BisectionTest.cs" company="Math.NET">
// Math.NET Numerics, part of the Math.NET Project
// http://numerics.mathdotnet.com
// http://github.com/mathnet/mathnet-numerics
//
// Copyright (c) 2009-2016 Math.NET
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

import { Bisection } from '../bisection';

test('It should find all roots', () => {
  const f1 = (x: number) => x * x - 4;
  expect(0).toBeCloseTo(f1(Bisection.findRoot(f1, 0, 5, 1e-14)), 1e-14);
  //expect(0).toBeCloseTo( f1(Bisection.FindRootExpand(f1, 3, 4, 1e-14)), 1e-14);
  expect(-2).toBeCloseTo(Bisection.findRoot(f1, -5, -1, 1e-14), 1e-14);
  expect(2).toBeCloseTo(Bisection.findRoot(f1, 1, 4, 1e-14), 1e-14);
  expect(0).toBeCloseTo(
    f1(Bisection.findRoot((x) => -f1(x), 0, 5, 1e-14)),
    1e-14,
  );
  expect(-2).toBeCloseTo(
    Bisection.findRoot((x) => -f1(x), -5, -1, 1e-14),
    1e-14,
  );
  expect(2).toBeCloseTo(
    Bisection.findRoot((x) => -f1(x), 1, 4, 1e-14),
    1e-14,
  );

  // Roots at 3, 4
  const f2 = (x: number) => (x - 3) * (x - 4);
  expect(0).toBeCloseTo(f2(Bisection.findRoot(f2, 3.5, 5, 1e-14)), 1e-14);
  expect(3).toBeCloseTo(Bisection.findRoot(f2, -5, 3.5, 1e-14), 1e-14);
  expect(4).toBeCloseTo(Bisection.findRoot(f2, 3.2, 5, 1e-14), 1e-14);
  expect(3).toBeCloseTo(Bisection.findRoot(f2, 2.1, 3.9, 0.001), 0.001);
  expect(3).toBeCloseTo(Bisection.findRoot(f2, 2.1, 3.4, 0.001), 0.001);
});

test('It should find the local minimum', () => {
  const f1 = (x: number) => x * x * x - 2 * x + 2;
  expect(0).toBeCloseTo(f1(Bisection.findRoot(f1, -5, 5, 1e-14)), 1e-14);
  expect(0).toBeCloseTo(f1(Bisection.findRoot(f1, -2, 4, 1e-14)), 1e-14);
});

test('It should throw no root error', () => {
  const f1 = (x: number) => x * x + 4;
  const solutionFinder = () => Bisection.findRoot(f1, -5, 5, 1e-14);
  expect(solutionFinder).toThrow();
});

test('It should find the complicated root', () => {
  const f1 = (z: number) =>
    (8 * Math.pow((4 - z) * z, 2)) / (Math.pow(6 - 3 * z, 2) * (2 - z)) - 0.186;
  const x: number = Bisection.findRoot(f1, 0.1, 0.9, 1e-9, 80);
  expect(0.277759543089215).toBeCloseTo(x, 1e-9);
  expect(0).toBeCloseTo(f1(x), 1e-9);
});

test('It should find the even more complicated root', () => {
  const f1 = (t: number) => {
    const x1 = 0.332112;
    const x2 = 1 - x1;
    const G12 = 0.07858889;
    const G21 = 0.30175355;
    const P2 = Math.pow(10, 6.87776 - 1171.53 / (224.366 + t));
    const P1 = Math.pow(10, 8.04494 - 1554.3 / (222.65 + t));
    const t1 = x1 + x2 * G12;
    const t2 = x2 + x1 * G21;
    const gamma2 = Math.exp(
      -Math.log(t2) - (x1 * (G12 * t2 - G21 * t1)) / (t1 * t2),
    );
    const gamma1 = Math.exp(
      -Math.log(t1) + (x2 * (G12 * t2 - G21 * t1)) / (t1 * t2),
    );
    const k1 = (gamma1 * P1) / 760;
    const k2 = (gamma2 * P2) / 760;
    return 1 - k1 * x1 - k2 * x2;
  };

  const x: number = Bisection.findRoot(f1, 0, 100);
  expect(58.70000239256).toBeCloseTo(x, 1e-5);
  expect(0).toBeCloseTo(f1(x), 1e-14);
});
