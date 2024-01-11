export type Color = {
    l: string;
    r: string;
    t: string;
};
export declare class Render {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    private r;
    private dx;
    private dy;
    private cubes;
    constructor(canvas: HTMLCanvasElement);
    private init;
    private initListeners;
    addCube(cube: Cube): void;
    reset(): void;
    render(): void;
    private sort;
    private paint;
    paintCube(x: number, y: number, colors: Color): void;
    paint4EdgesThing(a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    }, c: {
        x: number;
        y: number;
    }, d: {
        x: number;
        y: number;
    }, bg: string): void;
}
export declare class Cube {
    x: number;
    y: number;
    z: number;
    color: Color;
    constructor(x: number, y: number, z: number, color: Color);
    set(x: number, y: number, z: number): void;
}
