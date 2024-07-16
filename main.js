import './style.css';

// Get the canvas element and its drawing context
const canvas = document.getElementById('plinkoCanvas');
const ctx = canvas.getContext('2d');

// Set the dimensions of the canvas
canvas.width = 600;
canvas.height = 800;

// Arrays to hold the pegs and balls
const pegs = [];
const balls = [];

// Class representing a peg
class Peg {
  constructor(x, y) {
    this.x = x; // X-coordinate
    this.y = y; // Y-coordinate
    this.radius = 5; // Radius of the peg
  }

  // Method to draw the peg on the canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; // Black color
    ctx.fill();
    ctx.closePath();
  }
}

// Class representing a ball
class Ball {
  constructor(x, y) {
    this.x = x; // Initial X-coordinate
    this.y = y; // Initial Y-coordinate
    this.radius = 10; // Radius of the ball
    this.color = '#ff0000'; // Red color
    this.dx = Math.random() * 2 - 1; // Random initial horizontal velocity
    this.dy = 2; // Initial vertical velocity (falling down)
  }

  // Method to update the ball's position and handle collisions
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.1; // Gravity effect

    // Check for collisions with pegs
    for (let peg of pegs) {
      const dist = Math.hypot(this.x - peg.x, this.y - peg.y);
      if (dist < this.radius + peg.radius) {
        this.dy = -this.dy * 0.2; // Bounce back with reduced speed
        this.dx = (Math.random() - 0.5) * 2; // Random horizontal movement
      }
    }

    // Check for collisions with walls
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx; // Reverse horizontal velocity
    }

    // Check for collision with bottom of the canvas
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * 0.8; // Bounce back with reduced speed
      this.dx *= 0.8; // Reduce horizontal speed
    }
  }

  // Method to draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color; // Red color
    ctx.fill();
    ctx.closePath();
  }
}

// Function to create pegs in a grid pattern
function createPegs() {
  const spacing = 50; // Horizontal spacing between pegs
  const spacingY = 50; // Vertical spacing between pegs
  const ROWS = 10;

  // pegs.push(new Peg(canvas.width / 2, canvas.height / 2));
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < ROWS; col++) {
      let x = spacing * col + spacing;
      let y = spacing * row + spacing;

      pegs.push(new Peg(x, y));
    }
  }
  // for (let row = 2; row < ROWS; row++) {
  //   const numObstacles = row + 1;
  //   const y = 0 + row * 35;
  //   const spacing = 36;
  //   for (let col = 0; col < numObstacles; col++) {
  //     const x = canvas.width / 2 - spacing * (row / 2 - col);
  //     pegs.push(new Peg(x, y));
  //   }
  // }
}

// Animation loop to update and redraw the canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw all pegs
  for (let peg of pegs) {
    peg.draw();
  }

  // Update and draw all balls
  for (let ball of balls) {
    ball.update();
    ball.draw();
  }

  requestAnimationFrame(animate); // Request the next frame
}

// Event listener to add a new ball when the canvas is clicked
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect(); // Get the canvas position
  const x = event.clientX - rect.left; // Calculate the X-coordinate relative to the canvas
  const y = event.clientY - rect.top; // Calculate the Y-coordinate relative to the canvas
  balls.push(new Ball(x, y)); // Add a new ball to the array
});

// Create the pegs and start the animation loop
createPegs();
animate();
