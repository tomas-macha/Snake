import { Snake } from "./snake.js";


const snake = new Snake(document.getElementById("can") as HTMLCanvasElement);

window.addEventListener("keydown", e => {
	if(!snake.isRunning()) snake.run();
    console.log(e.key);
	switch(e.key){
		case "ArrowLeft":
		case "s":
		case "k":
			// LEFT
			snake.dx = 0;
			snake.dy = -1;
			break;
		case "ArrowUp":
		case "w":
		case "i":
			// UP
			snake.dx = -1;
			snake.dy = 0;
			break;
		case "ArrowRight":
		case "e":
		case "o":
			// RIGHT
			snake.dx = 0;
			snake.dy = 1;
			break;
		case "ArrowDown":
		case "d":
		case "l":
			// DOWN
			snake.dx = 1;
			snake.dy = 0;
			break;
	}
});