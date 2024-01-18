import { Render, Cube } from "./render.js";
const colors = {
    ground: {
        l: "#386641",
        r: "#a7c957",
        t: "#6a994e"
    },
    snake: {
        l: `hsl(${0 * 5 + 220}, 70%, 50%)`,
        r: `hsl(${0 * 5 + 220}, 80%, 60%)`,
        t: `hsl(${0 * 5 + 220}, 750%, 70%)`
    },
    apple: {
        l: "#660708",
        r: "#e5383b",
        t: "#a4161a"
    }
};
const fps = 30;
const duration = 500;
const fpp = fps * duration / 1000;
const size = 11;
export class Snake {
    constructor(canvas) {
        this.ground = [];
        this.snake = []; // Queue
        this.score = 2;
        this.running = false;
        this.t = 0;
        this.dx = 0;
        this.dy = 1;
        this.render = new Render(canvas);
        this.apple = new Cube(5, 5, 1, colors.apple);
        this.render.addCube(this.apple);
        this.generateGround();
        this.addSnakeCube((size - 1) / 2, 3);
        this.addSnakeCube((size - 1) / 2, 2);
        this.addSnakeCube((size - 1) / 2, 1);
        this.initFirstLast();
        this.render.render();
    }
    isRunning() {
        return this.running;
    }
    initFirstLast() {
        const first = new Cube(0, 0, 1, colors.snake);
        this.first = { cube: first, from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
        this.render.addCube(first);
        const last = new Cube(0, 0, 1, colors.snake);
        this.last = { cube: last, from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
        this.render.addCube(last);
    }
    run() {
        if (this.running)
            return;
        this.running = true;
        this.changeFirstLast();
        setInterval(() => {
            this.tick();
        }, duration / fpp);
    }
    tick() {
        this.t++;
        this.moveMoving();
        if (this.t == fpp)
            this.prepareMove();
    }
    prepareMove() {
        console.log("Prepare");
        this.t = 0;
        if (!(this.first && this.last))
            return;
        // Move snake
        for (let i = this.snake.length - 1; i >= 1; i--) {
            this.snake[i].set(this.snake[i - 1].x, this.snake[i - 1].y, 1);
            this.snake[i].render = true;
        }
        this.snake[0].set(this.first.to.x, this.first.to.y, 1);
        this.changeFirstLast();
        const lastSnake = this.snake.at(-1);
        if (lastSnake)
            lastSnake.render = false;
        this.render.render();
    }
    changeFirstLast() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!(this.first && this.last))
            return;
        this.first.from = { x: this.snake[0].x, y: this.snake[0].y };
        this.first.to = { x: this.snake[0].x + Number(this.dx), y: this.snake[0].y + Number(this.dy) };
        this.last.from = { x: (_b = (_a = this.snake.at(-1)) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0, y: (_d = (_c = this.snake.at(-1)) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0 };
        this.last.to = { x: (_f = (_e = this.snake.at(-2)) === null || _e === void 0 ? void 0 : _e.x) !== null && _f !== void 0 ? _f : 0, y: (_h = (_g = this.snake.at(-2)) === null || _g === void 0 ? void 0 : _g.y) !== null && _h !== void 0 ? _h : 0 };
    }
    moveMoving() {
        const p = this.t / fpp;
        console.log("Move", p);
        if (!(this.first && this.last))
            return;
        // f(1-p) + t*p
        this.first.cube.set(this.first.from.x * (1 - p) + this.first.to.x * p, this.first.from.y * (1 - p) + this.first.to.y * p, 1);
        this.last.cube.set(this.last.from.x * (1 - p) + this.last.to.x * p, this.last.from.y * (1 - p) + this.last.to.y * p, 1);
        this.render.render();
    }
    generateGround() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const cube = new Cube(x, y, 0, colors.ground);
                this.ground.push(cube);
                this.render.addCube(cube);
            }
        }
    }
    addSnakeCube(x, y) {
        const sc = new Cube(x, y, 1, colors.snake);
        this.snake.push(sc);
        this.render.addCube(sc);
    }
}
