//@ts-check
/**@type {HTMLCanvasElement} */ //@ts-ignore
let canvas = document.getElementById("canvas-1");
canvas.width = 1000;
canvas.height = 1000;
/** @type {CanvasRenderingContext2D} */ //@ts-ignore
let ctx = canvas.getContext("2d");

class ClickBox {
	constructor(x, y, colors, size) {
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

	amIClicked(x,y) {
		if(x < this.x) return false;
		if(x > this.x + this.size) return false;
		if(y < this.y) return false;
		if(y > this.y + this.size) return false;
		return true;
	}

	update(elapsedTime) {
		if(this.isClicked) return;
		this.lastRefresh += elapsedTime;
		if(this.lastRefresh < this.refreshRate) return;
		this.lastRefresh = 0;
		this.setColor();
	}

	draw() {
	// 	let square = new Path2D();
	// square.rect(x, y, size, size);
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.size, this.size);
	}
 }

let squares = [];
let gridSize = 4;
let size = canvas.width / gridSize;
let colors = ["red", "orange", "yellow", "green", "blue", "purple", "magenta", "pink", "brown", "black", "white", "teal"];
//other options for row = row + 1
//row += 1
//row++

for (let row = 0; row < gridSize; row = row + 1) {
	for (let column = 0; column < gridSize; column = column + 1) {
		let x = column * size;
		let y = row * size;
		let box = new ClickBox(x, y, colors, size);
		squares.push(box);
	}
}


canvas.addEventListener("click", (e) => {
	console.log(e.offsetX, e.offsetY);
	squares.forEach((b) => {
		if(b.amIClicked(e.offsetX, e.offsetY)) {
			b.isClicked = true;
		}
	});
});

let currentTime = 0;

function drawLoop(timeStamp) {
	let elapsedTime = timeStamp - currentTime;
	currentTime = timeStamp;
	squares.forEach((b) => {
		b.update(elapsedTime);
		b.draw();
	})

	requestAnimationFrame(drawLoop);
}


requestAnimationFrame(drawLoop);
