export default class Ball{
  constructor(x, y, radius, speed)
  {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.angle = 360;
  }

  draw(ctx)
  {
    const angle = this.angle * (Math.PI / 180);
    const x = (10 * Math.cos(angle) - 10 * Math.sin(angle)) * this.radius;    
    const y = (10 * Math.sin(angle) + 10 * Math.cos(angle)) * this.radius;

    if (this.angle <= 1)
      this.angle = 360;
    ctx.fillstyle = "black";
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fill();
    ctx.closePath();
    this.angle -= this.speed;
  }
}