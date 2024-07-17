import { Ball } from './Ball';
import {
  sinkWidth,
  obstacleRadius,
  WIDTH,
  HEIGHT,
  ballRadius,
} from './constants';
import { createPlinkos, createSinks } from './objects';

export class BallManager {
  constructor(canvasRef, onFinish) {
    this.balls = [];
    this.canvas = canvasRef;
    this.ctx = this.canvas.getContext('2d');
    this.plinkos = createPlinkos();
    this.sinks = createSinks();
    this.update();
    this.onFinish = onFinish;
  }

  addBall(startX) {
    const newBall = new Ball(
      startX || WIDTH / 2 + 13,
      50,
      ballRadius,
      'red',
      this.ctx,
      this.plinkos,
      this.sinks,
      (index) => {
        this.balls = this.balls.filter((ball) => ball !== newBall);
        this.onFinish?.(index, startX);
      }
    );

    this.balls.push(newBall);
  }

  drawPlinkos() {
    this.ctx.fillStyle = 'white';
    this.plinkos.forEach((plinko) => {
      this.ctx.beginPath();
      this.ctx.arc(plinko.x, plinko.y, plinko.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  getColor(index) {
    if (index < 3 || index > this.sinks.length - 3) {
      return { background: '#ff003f', color: 'white' };
    }
    if (index < 6 || index > this.sinks.length - 6) {
      return { background: '#ff7f00', color: 'white' };
    }
    if (index < 9 || index > this.sinks.length - 9) {
      return { background: '#ffbf00', color: 'black' };
    }
    if (index < 12 || index > this.sinks.length - 12) {
      return { background: '#ffff00', color: 'black' };
    }
    if (index < 15 || index > this.sinks.length - 15) {
      return { background: '#bfff00', color: 'black' };
    }
    return { background: '#7fff00', color: 'black' };
  }

  drawSinks() {
    this.ctx.fillStyle = 'green';
    const SPACING = obstacleRadius * 2;
    for (let i = 0; i < this.sinks.length; i++) {
      this.ctx.fillStyle = this.getColor(i).background;
      const sink = this.sinks[i];
      this.ctx.font = 'normal 13px Arial';
      this.ctx.fillRect(
        sink.x,
        sink.y - sink.height / 2,
        sink.width - SPACING,
        sink.height
      );
      this.ctx.fillStyle = this.getColor(i).color;
      this.ctx.fillText(
        sink?.multiplier?.toString() + 'x',
        sink.x - 15 + sinkWidth / 2,
        sink.y
      );
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawPlinkos();
    this.drawSinks();
    this.balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });
  }

  update() {
    this.draw();
    this.requestId = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}
