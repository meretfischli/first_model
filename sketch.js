let classifier 
let video
let gif_createImg

let modelURL = "./second_model/model.json"
let label
let confidence

let hair
let hairs = []
let hairstyles = []

function preload(){
	classifier = ml5.imageClassifier(modelURL);
	label = "Das Model laedt..."

	gif_createImg = createImg("./img/orange.gif");
	gif_createImg.size(0,0)

	hair = loadImage("./funny_hair/funny_hair_1.jpg")

	for(let i = 0; i < 7; i++){
		hairs[i] = loadImage("./funny_hair/funny_hair_" + i + ".jpg")
	}
}

function setup() {
	

	createCanvas(960, 600);
	video = createCapture(VIDEO)
	video.hide()

	textSize(32)
	textAlign(CENTER, CENTER)
	fill(255)

	classifyVideo()

	for(let i = 0; i < 6; i++){
		let x = random(width)
		let y = random(height)
		hairstyles[i] = new Hairstyle(x, y, 100, 100)
	}
}

function draw(){
	background(0)
	image(video, 0, 0, 960, 540)
	text(label, width/2, height-64)
	text(confidence, width/2, height-32)


	if (label == "orange"){
		heyApple()

	} else if (label == "gluehbirne"){
		light()

	} else if (label == "clip"){
		funnyHair()

	} else {

	}
}

function classifyVideo(){
	classifier.classify(video, gotResult)
}

function gotResult(error, result){
	if(error){
		console.error(error)
		return
	}

	classifyVideo()
	// console.log(result)
	label = result[0].label
	confidence = nf(result[0].confidence * 100, 0, 2) + "%"
}


function light(){
	gif_createImg.size(0,0)

	let posX = random(0,600)
	let posY = random(0,600)

	stroke(255, 255, 0)
	strokeWeight(2)
	for(let i = 0; i < 10; i++){
		line(posX, posY, width/2, height/2)
	}
}

function heyApple(){
	clearLines()
	gif_createImg.size(500,300)
	gif_createImg.position(width/2-250, height/2-150);
}

function clearLines(){
	noStroke()
}

function funnyHair(){
	for(let i = 0; i < 6; i++){
		//hairstyles[i].move()
		hairstyles[i].show()
	}
	//noch nicht ins array gepusht...
	image(hairs[0], 100, 200, 200, 200)
	image(hairs[1], 300, 100, 200, 200)
	image(hairs[2], 500, 300, 200, 200)
	image(hairs[4], 400, 50, 200, 200)
}

class Hairstyle {
	constructor(x, y, w, h) {
		this.x = random(width)
		this.y = random(height)
		this.w = 200
		this.h = 200
	}

	move(){
		this.y += 1
	}

	show(){
		stroke(255)
		strokeWeight(4)
		noFill()
		//ellipse(this.x, this.y, this.w, this.h)
	}
}