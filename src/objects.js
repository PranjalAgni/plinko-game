import {
  HEIGHT,
  MULTIPLIERS,
  NUM_SINKS,
  obstacleRadius,
  sinkWidth,
  WIDTH,
} from './constants';

export function createPlinkos() {
  const plinkos = [];
  const rows = 18;

  for (let row = 2; row < rows; row++) {
    const numPlinkos = row + 1;
    const y = row * 35;
    const spacing = 36;
    for (let col = 0; col < numPlinkos; col++) {
      const x = WIDTH / 2 - spacing * (row / 2 - col);
      plinkos.push({ x, y, radius: obstacleRadius });
    }
  }

  return plinkos;
}

export function createSinks() {
  const sinks = [];
  const spacing = obstacleRadius * 2;
  for (let idx = 0; idx < NUM_SINKS; idx++) {
    const x =
      WIDTH / 2 + sinkWidth * (idx - Math.floor(NUM_SINKS / 2)) - spacing * 1.5;
    const y = HEIGHT - 170;
    const width = sinkWidth;
    const height = width;
    sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[idx + 1] });
  }

  return sinks;
}
