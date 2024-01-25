export declare class Snake {
    private readonly render;
    private readonly ground;
    private snake;
    private apple;
    private score;
    private running;
    private t;
    private first;
    private last;
    dx: number;
    dy: number;
    constructor(canvas: HTMLCanvasElement);
    isRunning(): boolean;
    private initFirstLast;
    run(): void;
    private tick;
    private prepareMove;
    private checkMove;
    private changeFirstLast;
    private moveMoving;
    private generateGround;
    private addSnakeCube;
}
