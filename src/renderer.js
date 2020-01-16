import { Y_MAX, X_MAX } from './constants'

class Renderer {

  constructor() {}

  configure(options) {
    this.options = options
  }

  getRenderOpacity(prediction = 0) {
    const result = prediction > 0.5
      ? prediction
      : 1 - prediction

    return Number(result).toFixed(1)
  }

  renderLayout() {
    const layout = `
        <div class="container">
          <div id="results">
            <div id="selectedPoint"></div>
            <svg width="${X_MAX}" height="${Y_MAX}">
              <line xl="0" x2="${X_MAX}" y2="${Y_MAX}" stroke="gray" />
              <g id="points"></g>
            </svg>
          </div>
          <div id="options">
            <label>
              Iterations
              <input type="text" id="iterations" value="0" />
            </label>
            <button id="train">Train network</button>
            <button id="predict">Predict</button>
            <button id="generate">New points set</button>
          </div>
        </div>  
      `
    document.body.innerHTML = layout
    this.registerEvents()   
  }

  renderPoints(points) {
    const svg = `
          ${points.map(point =>
      `
              <circle
                data-prediction="${point.prediction}"
                cx="${point.x}"
                cy="${point.y}"
                r="3"
                fill="${point.prediction > 0.5 ? 'blue' : 'red'}"
                fill-opacity="${this.getRenderOpacity(point.prediction)}" />
            `
    )}
      `
    document.getElementById("points").innerHTML = svg
  }

  registerEvents() {
    const selectedPoint = document.getElementById('selectedPoint')
    const iterationsInput = document.getElementById('iterations')
    const trainBtn = document.getElementById('train')
    const predictBtn = document.getElementById('predict')
    const generateBtn = document.getElementById('generate')
    const svg = document.querySelector('svg')

    svg.addEventListener('click', ({ target }) => {
        if (target.tagName === 'circle') {
          selectedPoint.innerHTML = `Prediction: ${target.dataset.prediction}`
        }
    })

    trainBtn.addEventListener('click', () => {
      const iterations = +iterationsInput.value
      this.options.onLearn(iterations)
    })

    generateBtn.addEventListener('click', () => this.options.onGenerate())
    predictBtn.addEventListener('click', () => this.options.onPredict())
  }

}

export default Renderer

