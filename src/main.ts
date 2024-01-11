import { Snake } from "./snake.js";


const snake = new Snake(document.getElementById("can") as HTMLCanvasElement);

snake.run();

