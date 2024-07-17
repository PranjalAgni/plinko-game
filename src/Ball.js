import { gravity, horizontalFriction, verticalFriction } from './constants';

export class Ball {
  constructor(x, y, radius, color, ctx, plinkos, sinks, onFinish) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.plinkos = plinkos;
    this.sinks = sinks;
    this.onFinish = onFinish;
    this.vx = 0;
    this.vy = 0;
    this.bounceSound = new Audio('/bounce.mp3');
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    this.plinkos.forEach((plinko) => {
      const dist = Math.hypot(this.x - plinko.x, this.y - plinko.y);
      if (dist < this.radius + plinko.radius) {
        const angle = Math.atan2(this.y - plinko.y, this.x - plinko.x);
        // Reflect the ball's velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = Math.cos(angle) * speed * horizontalFriction;
        this.vy = Math.sin(angle) * speed * verticalFriction;

        // Adjust position to prevent sticking
        const overlap = this.radius + plinko.radius - dist;
        this.x += Math.cos(angle) * overlap;
        this.y += Math.sin(angle) * overlap;
        this.bounceSound.play();
      }
    });

    // Collision with sinks
    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];
      if (
        this.x > sink.x - sink.width / 2 &&
        this.x < sink.x + sink.width / 2 &&
        this.y + this.radius > sink.y - sink.height / 2
      ) {
        this.vx = 0;
        this.vy = 0;
        this.onFinish(i);
        break;
      }
    }
  }
}
