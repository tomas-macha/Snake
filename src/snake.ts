import { Render, Cube } from "./render.js";
import type {Color} from "./render";


const colors: {[k: string]: Color} = {
	ground: {
		l: "#386641",
		r: "#a7c957",
		t: "#6a994e"
	},
	snake: {
		l: `hsl(${0*5+220}, 70%, 50%)`,
        r: `hsl(${0*5+220}, 80%, 60%)`,
        t: `hsl(${0*5+220}, 750%, 70%)`
	},
	apple: {
		l: "#660708",
		r: "#e5383b",
		t: "#a4161a"
	}
}

const colorsSmart: {[k:string]: (i: number)=>Color} = {
    snake: (i:number) => {return{
		l: `hsl(${i*5+220}, 70%, 50%)`,
        r: `hsl(${i*5+220}, 80%, 60%)`,
        t: `hsl(${i*5+220}, 750%, 70%)`
    }}
}

const fps = 30;
const duration = 500;
const fpp = fps*duration/1000;
const size = 11;

type Moving = { cube: Cube, from: {x: number, y: number}, to: {x: number, y: number}};

export class Snake {

    private readonly render: Render;

    private readonly ground: Cube[] = [];
    private snake: Cube[] = []; // Queue
    private apple: Cube;

    private score: number = 2;
    private running: boolean = false;
    private t: number = 0;

    private first: Moving | undefined;
    private last: Moving | undefined;

    public dx: number = 0;
    public dy: number = 1;

    private readonly onLose: (score: number)=>void;

    private interval: NodeJS.Timeout|undefined;

    constructor(canvas: HTMLCanvasElement, lose: (score: number)=>void) {
        this.onLose = lose;
        this.render = new Render(canvas);
        
        this.apple = new Cube(5, 5, 1, colors.apple, "#0000");
		this.render.addCube(this.apple);

		this.generateGround();

		
		this.addSnakeCube((size-1)/2, 3);
		this.addSnakeCube((size-1)/2, 2);
		this.addSnakeCube((size-1)/2, 1);
        
        this.initFirstLast();

		this.render.render();
    }

    public isRunning(): boolean {
        return this.running;
    }

    private initFirstLast() {
        const first = new Cube(0, 0, 1, colors.snake, "#0000");
		this.first = {cube: first, from: {x:0,y:0}, to:{x:0,y:0}}
		this.render.addCube(first);
        const last = new Cube(0, 0, 1, colors.snake, "#0000");
		this.last = {cube: last, from: {x:0,y:0}, to:{x:0,y:0}}
		this.render.addCube(last);
    }

    public run(): void {
        if(this.running) return;
        this.running = true;
        this.changeFirstLast();
        this.interval = setInterval(()=>{
            this.tick();
        }, duration/fpp);

    }

    private tick(): void {
        this.t++;
        this.moveMoving();
        if(this.t == fpp) this.prepareMove();
    }

    private prepareMove(): void {
        this.t = 0;
        if(! (this.first && this.last)) return;
        // Move snake
        for(let i = this.snake.length-1; i >= 1; i--) {
            this.snake[i].set(this.snake[i-1].x, this.snake[i-1].y, 1);
            this.snake[i].render = true;
        }
        this.snake[0].set(this.first.to.x, this.first.to.y, 1);
        this.checkMove();
        this.changeFirstLast();
        const lastSnake = this.snake.at(-1);
        if(lastSnake) lastSnake.render = false;
        this.render.render();
    }

    private checkMove(): void {
        if(! (this.first && this.last)) return;
        const x = this.snake[0].x+Number(this.dx);
        const y = this.snake[0].y+Number(this.dy);
        if(x == this.apple.x && y == this.apple.y) {
            this.addSnakeCube(this.last.to.x, this.last.to.y);
            this.score++;
            while(this.generateApple()){}
        }
        if(
            this.snake.find(it => {
                return it.x == x && it.y == y;
            }) !== undefined
        ) {
            this.lose();
        }
        if(x < 0 || y < 0 || x >= size || y >= size) this.lose();
    }

    private lose(): void {
        this.running = false;
        clearInterval(this.interval);
        this.onLose(this.score);
    }

    private generateApple(): boolean {
        const x = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        const y = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        if(this.first && this.first.to.x == x && this.first.to.y == y) return true;
        if(this.last && this.last.from.x == x && this.last.from.y == y) return true;
        const exist = this.snake.find(it => {
            return it.x == x && it.y == y;
        }) !== undefined;
        if(exist) return true;
        this.apple.set(x, y, 1);
        return false;
    }

    private changeFirstLast() {
        if(! (this.first && this.last)) return;
        this.first.from = {x: this.snake[0].x, y: this.snake[0].y};
        this.first.to = {x: this.snake[0].x+Number(this.dx), y: this.snake[0].y+Number(this.dy)};
        this.last.from = {x: this.snake.at(-1)?.x??0, y: this.snake.at(-1)?.y??0};
        this.last.to = {x: this.snake.at(-2)?.x??0, y: this.snake.at(-2)?.y??0};
    }

    private moveMoving(): void {
        const p = this.t/fpp;

        if(!(this.first && this.last)) return;
        // f(1-p) + t*p
        this.first.cube.set(this.first.from.x*(1-p) + this.first.to.x*p, this.first.from.y*(1-p) + this.first.to.y*p, 1);
        this.last.cube.set(this.last.from.x*(1-p) + this.last.to.x*p, this.last.from.y*(1-p) + this.last.to.y*p, 1);

		this.render.render();
    }

    private generateGround(): void {
        for(let x = 0; x < size; x++){
			for(let y = 0; y < size; y++){
				const cube = new Cube(x, y, 0, colors.ground, "#222");
				this.ground.push(cube);
				this.render.addCube(cube);
			}
		}
    }

    private addSnakeCube(x: number, y: number): void {
        const sc = new Cube(x, y, 1, colors.snake, "#0000");
		this.snake.push(sc);
		this.render.addCube(sc);
    }


}

