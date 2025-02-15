import Ball from "./ball.js";

class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ball = new Ball(window.innerWidth/2, window.innerHeight/2, 20, 1);
    window.requestAnimationFrame(this.animate.bind(this));
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize()
  {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    this.ball.draw(this.ctx);
  }
}

window.onload = () => {
  new App();
};
