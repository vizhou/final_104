/*Vicky Zhou
vzhou@andrew.cmu.edu
Project 12 - Final
Section E*/

var particles; //number of particles in sphere system
var spacing; //spacing of particles
var waveRipple; //manipulates ripple in sphere system
var points; //array for compiling all sphere points
var speed; // speed variable for ripple sphere wave effect
var amplitude; //amplitude of wave

//variables for new toruses
var myx = [];
var myy = [];
var myz = [];

//variables for existing, old toruses
var total = 5;
var locations = new Array(total);
var bool = new Array(total);
var oldpart = [];
var oldpartsize = 12;

//to change displays
var changescene = true;


function setup() {
    createCanvas(600, 600, WEBGL);
    particles = 2000; 
    spacing = 200;
    points = [];
    speed = 0.01;
    amplitude = 0.8;
    wavecol = 0;
    
    if (changescene) {
    	//array of random points for wave of spheres
    	for (var i = 0; i < particles; i++) {
    		points[i] = createVector(random(-5, 5),
    								 random(-5, 5),
    								 random(-5, 5));
    	}
    } else {
    	//array for generated toruses
    	for (var i = 0; i < myx.length; i++) {
    		myx[i];
    		myy[i];
    		myz[i];
    	}

    	//array for already existing toruses
    	for (var i = 0; i < locations.length; i++) {
    		locations[i] = new Array(total);
    		bool[i] = new Array(total);
    		for (var j = 0; j < locations[i].length; j++) {
    			locations[i][j] = new Array(total);
    			bool[i][j] = new Array(total);
    			for (var k = 0; k < locations[i][j].length; k++) {
    				locations[i][j][k] = createVector(i * oldpartsize,
    												j * oldpartsize,
    												k * oldpartsize);
    				bool[i][j][k] = false;
    			}
    		}
    	}

    	var thres = 2; //threshold for state of Torus 
    	for (var i = 0; i < total; i++) {
    		for (var j = 0; j < total; j++) {
    			for (var k = 0; k < total; k++) {
    				stateofTorus = random(15); //random number for state 
    				if (stateofTorus <= thres) {
    					st = 1;
    					bool[i][j][k] = true;
    				} else {
    					st = 0;
    				}
    				oldpart.push(new myTorus(i * oldpartsize,
    										j * oldpartsize,
    										k * oldpartsize,
    										st));
    			}
    		}
    	}
    }
}


//create and push new coordinates for toruses when any key is pressed
function keyPressed() {
	myx.push(random(-10, 10));
	myy.push(random(-300, 300));
	myz.push(random(-300, 300));
}


function draw() {
	background(30, 30, 50);
	wavecol += 1;
	//light that is emiited
	directionalLight(wavecol/2, 200, 200, 50);
	ambientLight(80, wavecol/5, 170);
	//manipulates wave of spheres
	waveRipple = mouseX * speed;

	//center rotating cube
	push();
	rotateX(frameCount/100);
	rotateY(frameCount/100);
	noStroke();
	box(150);
	pop();

	if (changescene) {
		//array of random points to plot each sphere
		for (var i = 0; i < particles; i++) {
			var dot = points[i];
			doty = sin(dot.x + waveRipple) * amplitude;
			push();
			translate(dot.x * spacing, doty * spacing, dot.z * spacing);
			noStroke();
			sphere(10);
			pop();
		}
	} else {
		//array of existing toruses
		push();
		for (var i = 0; i < oldpart.length; i++) {
			oldpart[i].display();
		}
		pop();

		//create new toruses
		for (var i = 0; i < myx.length; i++) {
			rotateY(frameCount/500);
			push();
			if (keyIsPressed === true) {
				updatez = myz[i];
			} else {
				updatez = 100;
			}
			thenewy = cos(waveRipple) * amplitude + myy[i];
			thenewz = 0;
			directionalLight(wavecol/2, 200, 200, 50);
			translate(myx[i], thenewy, thenewz + updatez);
			var gradred = map(mouseX, 0, width, 0, 255);
			var gradgreen = map(mouseX, 0, width, 0, 200);
			fill(gradred, gradgreen, 200);
			strokeWeight(0.2);
			stroke("blue");
			torus(12, 5);
			pop();
		}
	}
}

//function to create existing toruses
function myTorus(x, y, z, st) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.st = st;

	this.display = function() {
		if (this.st == 1) {
			rotateY(frameCount/350);
			push();
			directionalLight(wavecol/2, 200, 200, 250);
			translate(this.x, this.y, this.z * 3.5);
			strokeWeight(0.2);
			stroke("blue");
			torus(oldpartsize, 5);
			pop();
		}
	}
}

//click mouse to toggle between scenes
function mousePressed() {
	changescene =! (changescene);
	setup();
}

