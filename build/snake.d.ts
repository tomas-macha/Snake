export declare class Snake {
    private readonly render;
    private readonly ground;
    private snake;
    private apple;
    private score;
    private running;
    private t;
    constructor(canvas: HTMLCanvasElement);
    run(): void;
    private tick;
    private prepareMove;
    private moveMoving;
    private generateGround;
    private addSnakeCube;
}
