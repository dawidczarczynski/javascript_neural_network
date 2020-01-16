import { Y_MAX, X_MAX } from './constants'

const getRenderOpacity = prediction => {
  const result = prediction > 0.5
    ? prediction
    : 1 - prediction

  return Number(result).toFixed(1)
} 
 
export function render(points) {
  const svg = `
    <div id="selectedPoint"></div>
    <svg width="${X_MAX}" height="${Y_MAX}">
      <line xl="0" x2="${X_MAX}" y2="${Y_MAX}" stroke="gray" />
      ${points.map(point =>
        `
          <circle
            data-prediction="${point.prediction}"
            cx="${point.x}"
            cy="${point.y}"
            r="3"
            fill="${point.prediction > 0.5 ? 'blue' : 'red'}"
            fill-opacity="${getRenderOpacity(point.prediction)}" />
        `
      )}
    </svg>
  `
  document.body.innerHTML = svg

  const selected = document.getElementById('selectedPoint')
  document
    .querySelector('svg')
    .addEventListener('click', ({ target }) => {
      if (target.tagName === 'circle') {
        selected.innerHTML = `
          Prediction: ${target.dataset.prediction}
        `
      }
  })
}