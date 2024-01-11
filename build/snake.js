import { Render, Cube } from "./render.js";
const colors = {
    ground: {
        l: "#386641",
        r: "#a7c957",
        t: "#6a994e"
    },
    snake: {
        l: "#f96767",
        r: "#67b7f9",
        t: "#f9cf67"
    },
    apple: {
        l: "#660708",
        r: "#e5383b",
        t: "#a4161a"
    }
};
const fps = 10;
const duration = 200;
const size = 11;
export class Snake {
    constructor(canvas) {
        this.ground = [];
        this.snake = []; // Queue
        this.score = 2;
        this.running = false;
        this.t = 0;
        this.render = new Render(canvas);
        this.apple = new Cube(5, 5, 1, colors.apple);
        this.render.addCube(this.apple);
        this.generateGround();
        this.addSnakeCube((size - 1) / 2, 3);
        this.addSnakeCube((size - 1) / 2, 2);
        this.addSnakeCube((size - 1) / 2, 1);
        this.render.render();
    }
    run() {
        if (this.running)
            return;
        this.running = true;
        setInterval(() => {
            this.tick();
        }, duration / fps);
    }
    tick() {
        if (++this.t == fps)
            this.prepareMove();
        else
            this.moveMoving();
    }
    prepareMove() {
        console.log("Prepare");
        this.t = 0;
    }
    moveMoving() {
        console.log("Move");
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
        const sc = new Cube(x, y, 1, {
            l: `hsl(${this.snake.length * 5 + 220}, 70%, 50%)`,
            r: `hsl(${this.snake.length * 5 + 220}, 80%, 60%)`,
            t: `hsl(${this.snake.length * 5 + 220}, 750%, 70%)`
        });
        this.snake.push(sc);
        this.render.addCube(sc);
    }
}
