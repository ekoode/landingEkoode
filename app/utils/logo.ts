// Geometría copiada sin cambios de public/brand/ekoode-logotipo-color-oscuro.svg.
// Solo se separa en piezas para poder animarlas.

export const LOGO_VIEWBOX = '0 -2 642 104'
export const LOGO_RATIO = 642 / 104

export const LOGO_LETTERS = [
  { id: 'e1', x: 0, w: 76, d: 'M0 0H76V28H28V38H68V62H28V72H76V100H0Z' },
  { id: 'o1', x: 206, w: 108, d: 'M206 50a54 51 0 1 0 108 0a54 51 0 1 0-108 0ZM234 50a26 23 0 1 0 52 0a26 23 0 1 0-52 0Z' },
  { id: 'o2', x: 326, w: 108, d: 'M326 50a54 51 0 1 0 108 0a54 51 0 1 0-108 0ZM354 50a26 23 0 1 0 52 0a26 23 0 1 0-52 0Z' },
  { id: 'd', x: 448, w: 100, d: 'M448 0H500A48 50 0 0 1 500 100H448ZM476 28V72H500A20 22 0 0 0 500 28Z' },
  { id: 'e2', x: 566, w: 76, d: 'M566 0H642V28H594V38H634V62H594V72H642V100H566Z' },
] as const

export const K_OFFSET_X = 94

export const K_PLANES = {
  stem: '0,0 28,0 28,100 0,100',
  arm: '28,50 78,0 98,0 98,20 28,90',
  leg: '28,50 78,100 98,100 98,80 28,10',
  node: '28,50 48,30 68,50 48,70',
} as const
