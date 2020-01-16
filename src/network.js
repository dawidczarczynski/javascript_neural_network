
import NeuralNetwork from './nn'

console.log("Network thread: Constructing neural network...");
const brain = new NeuralNetwork([2, 7, 8, 5, 1]);
console.log("Network thread: Neural network constructed");

onmessage = event => {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case "LEARN":
      const { iterations } = message
      console.log("Network thread: Starting network learning...")

      for (let i = 0; i < iterations; i++) {
        const x = Math.random()
        const y = Math.random()
        brain.train([x, y], (x > y ? [1] : [0]))
      }

      console.log("Network thread: Network learnt")

      postMessage({ type: "STATUS", status: "LEARNT" })
      break

    case "PREDICT":
      const { points } = message

      console.log("Network thread: Prediction started....")
      const predictions = points.map(({ x, y }) => ({
        x,
        y,
        prediction: brain.predict([x, y])
      }))
      console.log("Network thread: Prediction done")

      postMessage({ type: "PREDICTION", predictions })
      break
  }

}
