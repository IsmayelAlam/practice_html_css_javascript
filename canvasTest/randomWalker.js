const canvas = document.querySelector(".canvas");
const colors = ["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6", "#03045e"];
const mouse = { x: undefined, y: undefined };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Particles {
  constructor(x, y, distance) {
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.radius = 10;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(x, y) {
    this.draw();
    this.x = x;
    this.y = y;
  }
}

// function init() {
//   let x = innerWidth / 2;
//   let y = innerHeight / 2;

//   return new Particles(x, y);
// }

// const test = init();

let perlin;
const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;
let perlin_octaves = 4;
let perlin_amp_falloff = 0.5;
const scaled_cosine = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI));

function noise(x, y = 0, z = 0) {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;

  let r = 0;
  let ampl = 0.5;

  let n1, n2, n3;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
}

function init(distance) {
  let x = 100;
  let y = 100;

  return new Particles(x, y, distance);
}

let time = 1;

const particleArr = [];

for (let i = 0; i < 50; i++) {
  particleArr.push(init(i));
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  ctx.fillStyle = "rgba(0,0,0,0.25";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  let x = noise(time * 0.00025) * canvas.width;
  let y = noise(time * 0.00025 + 25) * canvas.height;

  particleArr.forEach((dot) => {
    dot.x =
      noise(time * 0.005) * canvas.width +
      dot.distance * ((Math.random() - 0.5) * 2);
    dot.y =
      noise(time * 0.005 + 25) * canvas.height +
      dot.distance * ((Math.random() - 0.5) * 2);
    dot.update(x, y);
  });
  time++;
}

animateCircle();
