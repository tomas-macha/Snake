const deg30 = Math.cos(Math.PI/6);

export type Color = {
	l: string,
	r: string,
	t: string
};

export class Render {

	public readonly canvas: HTMLCanvasElement;
	public readonly ctx: CanvasRenderingContext2D;

	private r = 40;
	private dx: number = 0;
	private dy: number = 0;

	private cubes: Cube[] = [];

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.init();
		this.initListeners();
	}

	private init(): void {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
		this.r = 40;
		this.dx = deg30*this.r*1.5;
		this.dy = this.canvas.height/2;
		this.render();
	}

	private initListeners(): void {
		const _ = this;
		window.addEventListener("resize", function(){
			_.init();
		});
	}

	public addCube(cube: Cube): void {
		this.cubes.push(cube);
	}

	public reset(): void {
		this.cubes = [];
	}

	public render(): void {
		this.sort();
		this.paint();
	}

	private sort(): void {
		this.cubes.sort((a: Cube, b: Cube) => {
			const an = a.x*10-a.y*10+a.z*100;
			const bn = b.x*10-b.y*10+b.z*100;
			return an - bn;
		});
	}

	private paint(): void {
		this.ctx.fillStyle="#222";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.cubes.forEach(cube => {
			if(!cube.render) return;
			this.paintCube(
				this.dx+ (cube.x+cube.y)*this.r*deg30,
				this.dy+ (cube.x-cube.y - 2*cube.z)*this.r/2,
				cube.color,
				cube.stroke
			);
		});
	}

	
	paintCube(x: number, y: number, colors: Color, stroke: string) {
		const ver: {[k in "a"|"b"|"c"|"d"|"e"|"f"|"_"]: {x: number, y: number}} = {
			a: {x: x, y: y-this.r},
			b: {x: x+this.r*deg30, y: y-this.r/2},
			c: {x: x+this.r*deg30, y: y+this.r/2},
			d: {x: x, y: y+this.r},
			e: {x: x-this.r*deg30, y: y+this.r/2},
			f: {x: x-this.r*deg30, y: y-this.r/2},
			_: {x, y}
		}
		this.paint4EdgesThing(ver.f, ver._, ver.d, ver.e, colors.l, stroke);
		this.paint4EdgesThing(ver.b, ver.c, ver.d, ver._, colors.r, stroke);
		this.paint4EdgesThing(ver.a, ver.b, ver._, ver.f, colors.t, stroke);
	}

	paint4EdgesThing(a: {x: number, y: number}, b: {x: number, y: number}, c: {x: number, y: number}, d: {x: number, y: number}, bg: string, stroke: string) {
		this.ctx.beginPath();
		this.ctx.moveTo(a.x, a.y);
		this.ctx.lineTo(b.x, b.y);
		this.ctx.lineTo(c.x, c.y);
		this.ctx.lineTo(d.x, d.y);
		this.ctx.closePath();
		this.ctx.fillStyle = bg;
		this.ctx.strokeStyle = stroke;
		this.ctx.fill();
		this.ctx.stroke();
	}

}

export class Cube {

	public x: number;
	public y: number;
	public z: number;
	public color: Color;
	public render: boolean = true;
	public stroke: string;

	constructor(x: number, y: number, z: number, color: Color, stroke: string) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.color = color;
		this.stroke = stroke;
	}

	public set(x: number, y: number, z: number): void {
		this.x = x;
		this.y = y;
		this.z = z;
	}

}