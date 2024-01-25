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
    private readonly onLose;
    private interval;
    constructor(canvas: HTMLCanvasElement, lose: (score: number) => void);
    isRunning(): boolean;
    private initFirstLast;
    run(): void;
    private tick;
    private prepareMove;
    private checkMove;
    private lose;
    private generateApple;
    private changeFirstLast;
    private moveMoving;
    private generateGround;
    private addSnakeCube;
}
