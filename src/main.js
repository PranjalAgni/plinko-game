import '../style.css';
import { BallManager } from './BallManager';

// Get the canvas element and its drawing context
const canvas = document.getElementById('plinkoCanvas');

const ballManager = new BallManager(canvas);

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect(); // Get the canvas position
  const x = event.clientX - rect.left; // Calculate the X-coordinate relative to the canvas
  ballManager.addBall(x);
  // const randomDropPoint = Math.random() * (430 - 350) + 350;
  // dropping the ball at a random point between 350 and 430
  // ballManager.addBall(randomDropPoint);
});
