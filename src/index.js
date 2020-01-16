import * as R from 'ramda'
import { Y_MAX, X_MAX } from './constants'
import { rand } from './utils'
import { render } from './render';

const networkThread = new Worker('./network.js', { type: 'module' })

networkThread.onmessage = event => {
  const message = event.data;

  switch (message.type) {

    case "STATUS":
      const points = R.range(0, 100).map(_ => ({
        x: rand(0, X_MAX),
        y: rand(0, Y_MAX)
      }))
      networkThread.postMessage(JSON.stringify({ type: 'PREDICT', points }))
      break

    case "PREDICTION": 
      const { predictions } = message
      render(predictions)
      break
  
  }
}
networkThread.postMessage(JSON.stringify({ type: 'LEARN', iterations: 1000000 }))
