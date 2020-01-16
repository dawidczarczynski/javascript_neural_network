class NetworkThread {

    constructor(options) {
      this.thread = new Worker('./networkWorker.js', { type: 'module' })
      this.thread.onmessage = event => {
        const message = event.data;

        switch (message.type) {
          case "READY":
            if (options.onReady) options.onReady()
            break

          case "PREDICTION":
            const { predictions } = message
            if (options.onPrediction) options.onPrediction(predictions)
            break
        }
      }
    }

    learnNetwork(iterations) {
      const message = JSON.stringify({
        type: 'LEARN', 
        iterations
      })

      this.thread.postMessage(message)
    }

    predict(points) {
      const message = JSON.stringify({ 
        type: 'PREDICT', 
        points
      })

      this.thread.postMessage(message)
    }

}

export default NetworkThread