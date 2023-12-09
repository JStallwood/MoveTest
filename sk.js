let facemesh;
let video;
let predictions = [];
let averagePoint;

const W = 600;
const H = 480;

function setup() {
  createCanvas(W, H);
  video = createCapture(VIDEO);
  video.size(W, H);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("face", results => {
    predictions = results;
  });

  video.hide();
}

function modelReady() {
  console.log("model initialized");
}

function draw() {
  background(255);

  if(averagePoint) {
    strokeWeight(20);
    stroke(0);
    point(averagePoint.x, averagePoint.y);
    strokeWeight(10);
    stroke(255, 0, 255);
    point(averagePoint.x, averagePoint.y);
  }

  getAverage();
}

function getAverage() {
    
    predictions.forEach(pre => {
        let test = createVector();
        let keys = pre.scaledMesh;
        keys.forEach(k => {
            test.x += k[0];
            test.y += k[1];
        });
        test.mult(1/keys.length);
        test.x = W - test.x;
        averagePoint = test;
    });
    
}