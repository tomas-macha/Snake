const deg30 = Math.cos(Math.PI / 6);
export class Render {
    constructor(canvas) {
        this.r = 40;
        this.dx = 0;
        this.dy = 0;
        this.cubes = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.init();
        this.initListeners();
    }
    init() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.r = 40;
        this.dx = deg30 * this.r * 1.5;
        this.dy = this.canvas.height / 2;
        this.render();
    }
    initListeners() {
        const _ = this;
        window.addEventListener("resize", function () {
            _.init();
        });
    }
    addCube(cube) {
        this.cubes.push(cube);
    }
    reset() {
        this.cubes = [];
    }
    render() {
        this.sort();
        this.paint();
    }
    sort() {
        this.cubes.sort((a, b) => {
            const an = a.x * 10 - a.y * 10 + a.z * 100;
            const bn = b.x * 10 - b.y * 10 + b.z * 100;
            return an - bn;
        });
    }
    paint() {
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.cubes.forEach(cube => {
            if (!cube.render)
                return;
            this.paintCube(this.dx + (cube.x + cube.y) * this.r * deg30, this.dy + (cube.x - cube.y - 2 * cube.z) * this.r / 2, cube.color);
        });
    }
    paintCube(x, y, colors) {
        const ver = {
            a: { x: x, y: y - this.r },
            b: { x: x + this.r * deg30, y: y - this.r / 2 },
            c: { x: x + this.r * deg30, y: y + this.r / 2 },
            d: { x: x, y: y + this.r },
            e: { x: x - this.r * deg30, y: y + this.r / 2 },
            f: { x: x - this.r * deg30, y: y - this.r / 2 },
            _: { x, y }
        };
        this.paint4EdgesThing(ver.f, ver._, ver.d, ver.e, colors.l);
        this.paint4EdgesThing(ver.b, ver.c, ver.d, ver._, colors.r);
        this.paint4EdgesThing(ver.a, ver.b, ver._, ver.f, colors.t);
    }
    paint4EdgesThing(a, b, c, d, bg) {
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.lineTo(c.x, c.y);
        this.ctx.lineTo(d.x, d.y);
        this.ctx.closePath();
        this.ctx.fillStyle = bg;
        this.ctx.strokeStyle = "#222";
        this.ctx.fill();
        //this.ctx.stroke();
    }
}
export class Cube {
    constructor(x, y, z, color) {
        this.render = true;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
