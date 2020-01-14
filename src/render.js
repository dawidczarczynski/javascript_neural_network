import { Y_MAX, X_MAX } from './constants'
 
export function render(points) {
  const svg = `
    <svg width="${X_MAX}" height="${Y_MAX}">
      ${points.map(point =>
        `
          <circle
            cx="${point.x}"
            cy="${point.y}"
            r="3"
            fill="${point.where > 0.5 ? 'blue' : 'red'}" />
          <line xl="0" x2="${X_MAX}" y2="${Y_MAX}" stroke="gray" />
        `
      )}
    </svg>
  `

  document
    .getElementById('root')
    .innerHTML = svg
}