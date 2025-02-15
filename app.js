import Ball from "./ball.js";

class App {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");

    this.camera = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      d: 50,
    };

    this.ball = [];
    this.ball.push(new Ball(10, -100, 10, 5, 1));
    this.ball.push(new Ball(10, 10, 10, 5, 1));
    this.ball.push(new Ball(30, 30, 20, 5, 1));
    this.ball.push(new Ball(40, 40, 20, 5, 1));
    this.ball.push(new Ball(45, 50, 20, 5, 1));
    

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("keydown", this.updateCamera.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateCamera(e)
  {
    if (e.keyCode == 187)
      this.camera.d -= 1;
    if (e.keyCode == 189)
      this.camera.d += 1; 
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.ball.length; i++) {
      this.ball[i].draw(this.ctx, this.camera);
    }
    this.connect();
  }

  connect()
  {
    const length = this.ball.length;
    
    for(let i = 0; i < length; i++)
    {
      for(let j = i + 1; j < length; j++)
      {
        const dx = this.ball[i].screenX - this.ball[j].screenX;
        const dy = this.ball[j].screenY - this.ball[j].screenY;
        const distance = Math.sqrt((dx*dx) + (dy*dy));
        console.log(distance);
        if (distance < 200)
        {
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "black";
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
