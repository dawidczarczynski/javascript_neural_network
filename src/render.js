import { Y_MAX, X_MAX } from './constants'
import { predict } from './network'
 
export function render(points, weights, generation) {
  const header = `<p>Generation: ${generation}</p>`
  const svg = `
    <svg width="${X_MAX}" height="${Y_MAX}">
      ${points.map(point =>
        `
          <circle
            cx="${point.x}"
            cy="${point.y}"
            r="3"
            fill="${predict(weights, point) === -1 ? 'blue' : 'red'}" />
          <line xl="0" x2="${X_MAX}" y2="${Y_MAX}" stroke="gray" />
        `
      )}
    </svg>
  `

  document
    .getElementById('root')
    .innerHTML = `${header}${svg}`
}

export function clear() {
  document.getElementById('root').innerHTML = ''
}