import * as R from 'ramda'
import { Y_MAX, X_MAX } from './constants'
import NeuralNetwork from './nn'
import { rand } from './utils'
import { render } from './render';

const brain = new NeuralNetwork([2, 7, 8, 5, 1]);

for (let i = 0; i < 100000; i++) {
  const x = Math.random()
  const y = Math.random()
  brain.train([x, y], (x > y ? [1] : [0]));
}

console.log(brain.predict([0, 100]))
console.log(brain.predict([100, 12]))

const randomPoints = R.range(0, 100).map(_ => ({
  x: rand(0, X_MAX),
  y: rand(0, Y_MAX)
})).map(({ x, y }) => ({
  x,
  y,
  where: brain.predict([x, y])
}))

render(randomPoints)