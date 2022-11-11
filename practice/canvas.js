//@ts-check
/**@type {HTMLCanvasElement} */ //@ts-ignore
let canvas = document.getElementById("canvas-1");
canvas.width = 1000;
canvas.height = 1000;
/** @type {CanvasRenderingContext2D} */ //@ts-ignore
let ctx = canvas.getContext("2d");

class ClickBox {
	constructor(x, y, size, colors) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.isClicked = false;
		this.refreshRate = 500;
		this.lastRefresh = 0;
		this.color = "red";
		this.colors = colors;
		this.setColor();
	}
	setColor() {
		let colorIndex = Math.floor(Math.random() * this.colors.length);
		this.color = colors[colorIndex];
	}
	update(elapsedTime) {
		this.lastRefresh += elapsedTime;
		if(this.lastRefresh < this.refreshRate) return;
		if(this.lastRefresh >= this.refreshRate) {
			this.setColor();
		}
	}

	draw() {}
 }

let squares = [];
let gridSize = 4;
let size = canvas.width / gridSize;
let colors = ["red", "orange", "yellow", "green", "blue", "purple", "magenta", "pink", "brown", "black", "white", "teal"];
//other options for row = row + 1
//row += 1
//row++

function drawSquare(x, y, color, size = 150) {
	let square = new Path2D();
	square.rect(x, y, size, size);
	squares.push(square);
	ctx.fillStyle = color;
	ctx.fillRect(x, y, size, size);
}
console.log(squares);

let currentTime = 0;
const refreshRate = 500;
let lastRefresh = 0;

function drawLoop(timeStamp) {
	let elapsedTime = timeStamp - currentTime;
	currentTime = timeStamp;
	lastRefresh = lastRefresh + elapsedTime;
	if(lastRefresh >= refreshRate) {
		lastRefresh = 0;
		for (let row = 0; row < gridSize; row = row + 1) {
			for (let column = 0; column < gridSize; column = column + 1) {
				let colorIndex = Math.floor(Math.random() * colors.length);
				let color = colors[colorIndex];
				drawSquare(column * size, row * size, color, size);
			}
		}
	}

	requestAnimationFrame(drawLoop);
}
requestAnimationFrame(drawLoop);
