import Ball from "./ball.js";

class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");

    this.camera = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      d: -400,
    };

    this.ball = [];
    const numBalls = 360;  
    const radius = 200;   
    
    for (let i = 0; i < numBalls; i++) {
      const theta = Math.acos(1 - (2 * i) / numBalls); 
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;   
    
      const x = Math.sin(theta) * Math.cos(phi) * radius;
      const y = Math.sin(theta) * Math.sin(phi) * radius;
      const z = Math.cos(theta) * radius;
    
      const ballRadius = 5;
      const speed = Math.random() * 1 + 0.2;
      const color = "black";
    
      this.ball.push(new Ball(x, y, z, ballRadius, speed, color));
    }
    // for (let i = 1; i < 30; i++) {
    //   const x = 10 + i * 5;
    //   const y = 150 + -i * 5;
    //   const z = 160;
    //   const radius = 5;
    //   const speed = Math.random() * 2 + 0.5;
    //   const r = Math.floor(Math.random() * 255);
    //   const g = Math.floor(Math.random() * 255);
    //   const b = Math.floor(Math.random() * 255);
    //   // const color = `rgba(${r},${g},${b},0.4)`;
    //   const color = "black";

    //   this.ball.push(new Ball(x, y, z, radius, speed, color));
    // }
  
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("keydown", this.updateCamera.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateCamera(e) {
    if (e.keyCode == 187) this.camera.d -= 20;
    if (e.keyCode == 189) this.camera.d += 20;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.ball.length; i++) {
      this.ball[i].draw(this.ctx, this.camera);
    }
    // this.connect();
  }

  connect() {
    const length = this.ball.length;

    for (let i = 0; i < length; i++) {
      for (let j = i + 1; j < length; j++) {
        const dx = this.ball[i].screenX - this.ball[j].screenX;
        const dy = this.ball[j].screenY - this.ball[j].screenY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        console.log(distance);
        if (distance < 20) {
          this.ctx.lineWidth = 1;
          this.ctx.strokeStyle = this.ball[i].color;
          this.ctx.moveTo(this.ball[i].screenX, this.ball[i].screenY);
          this.ctx.lineTo(this.ball[j].screenX, this.ball[j].screenY);
          this.ctx.stroke();
        }
      }
    }
  }
}

window.onload = () => {
  new App();
};
