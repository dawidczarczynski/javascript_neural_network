import * as R from 'ramda';
import { Y_MAX, X_MAX } from './constants'
import { testTrain } from './network'
import { rand } from './utils'
import { render } from './render';

const randomWeights = ({
  x: rand(-1, 1),
  y: rand(-1, 1)
})

const randomPoints = R.range(0, 100).map(_ => ({
  x: rand(0, X_MAX),
  y: rand(0, Y_MAX)
}))

testTrain(randomWeights, randomPoints)
  .subscribe(({ trainedWeights, generation }) => {
    render(randomPoints, trainedWeights, generation)
  })
