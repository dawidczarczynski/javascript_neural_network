import { Observable } from 'rxjs'

export const team = point => {
  return point.x > point.y ? 1 : -1
}

export const predict = (weights, point) => {
  const sum =
    point.x * weights.x +
    point.y * weights.y
  const result = sum >= 0 ? 1 : -1

  return result
}

export function train(weights, point, team) {
  const prediction = predict(weights, point)
  const error = team - prediction
  const learningRate = 0.1

  return {
    x: weights.x + (point.x * error * learningRate),
    y: weights.y + (point.y * error * learningRate)
  }
}

export function testTrain(initialWeights, points) {
  let trainedWeights = initialWeights
  let generation = 1

  return Observable.create(observer => {
    const interval = setInterval(() => {
      if (generation >= points.length) {
        clearInterval(interval)
        observer.complete({
          trainedWeights,
          generation
        })
      } else {
        const point = points[generation]
        trainedWeights = train(trainedWeights, point, team(point))

        observer.next({
          trainedWeights,
          generation 
        })
        generation++
      }
    }, 1000)
  })
}