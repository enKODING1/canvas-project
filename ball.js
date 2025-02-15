export default class Ball {
  constructor(x, y, z, radius, speed) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.screenX = 0;
    this.screenY = 0;
    this.radius = radius;
    this.speed = speed;
    this.angle = 0;
  }

  draw(ctx, camera) {
    const angleRad = (this.angle * Math.PI) / 180;
    const rotatedX = this.x * Math.cos(angleRad) + this.z * Math.sin(angleRad);
    const rotatedY = this.y;
    const rotatedZ = -this.x * Math.sin(angleRad) + this.z * Math.cos(angleRad);

    const perspective = camera.d / (camera.d + rotatedZ);
    this.screenX = rotatedX * perspective + camera.x;
    this.screenY = rotatedY * perspective + camera.y;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.screenX, this.screenY, this.radius * perspective, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    this.angle += this.speed;
    if (this.angle >= 360) this.angle -= 360;
  }
}