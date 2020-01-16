import * as R from 'ramda'
import Renderer from './renderer'
import NetworkThread from './networkThread'
import { rand } from './utils'
import { X_MAX, Y_MAX } from './constants';

let points = [];
const generatePoints = () => R.range(0, 100).map(() => ({
  x: rand(0, X_MAX),
  y: rand(0, Y_MAX)
}))

const renderer = new Renderer()
const thread = new NetworkThread({
  onPrediction: points => renderer.renderPoints(points)
})

renderer.configure({
  onGenerate: () => {
    points = generatePoints()
    thread.predict(points)
  },
  onLearn: iterations => thread.learnNetwork(iterations),
  onPredict: () => thread.predict(points)
})

renderer.renderLayout()