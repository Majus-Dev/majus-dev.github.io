((d) => {
  const c = d.querySelector("#c");
  const ctx = c.getContext("2d");

  c.width = innerWidth;
  c.height = innerHeight;

  class Particles {
    constructor({ x, y, color, radius, d }) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = radius;
      this.d = d;
      this.lineWidth = 0.5;
      this.range = 200;
    }

    update(particles) {
      const length = particles.length;
      this.d = border(this.x, this.y, this.d, this.radius);

      this.x += this.d.x;
      this.y += this.d.y;

      for (let i = 0; i < length; i++) {
        if (this === particles[i]) continue;
        const dist = distance(this, particles[i]);
        if (dist < this.range) {
          ctx.lineWidth = this.lineWidth;
          ctx.strokeStyle = `rgba(255,255,255,${1 - dist / this.range})`;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.stroke();
          ctx.closePath();
        }
      }

      this.draw();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  let particles;

  const init = (e) => {
    c.width = innerWidth;
    c.height = innerHeight;

    const particlesLenght = 200;
    particles = [];

    for (let i = 0; i < particlesLenght; i++) {
      particles.push(new Particles(setup()));
    }
  };

  const distance = (p1, p2) => {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  };

  const border = (x, y, d, radius) => {
    if (x + radius >= c.width || x - radius <= 0) {
      d.x = -d.x;
    }

    if (y + radius >= c.height || y - radius <= 0) {
      d.y = -d.y;
    }

    return { x: d.x, y: d.y };
  };

  const animation = () => {
    
    ctx.clearRect(0, 0, c.width, c.height);
    particles.forEach((particle) => {
      particle.update(particles);
    });

    requestAnimationFrame(animation);
  };

  const setup = (e = false) => {
    const degrees = 360;
    const radius = 3;
    const x = Math.random() * (c.width - radius * 2) + radius;
    const y = Math.random() * (c.height - radius * 2) + radius;
    const speed = 1 + Math.random() * 2;
    const directionAngle = Math.floor(Math.random() * degrees);
    const color = "rgba(255,255,255,0.5)";

    const d = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed
    };
    return { x, y, color, radius, d };
  };

  init();
  requestAnimationFrame(animation);
})(document);
