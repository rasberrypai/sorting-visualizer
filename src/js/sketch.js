//graphics properties
let canvasHeight;
let canvasWidth;

//color gradient
let startColor;
let destColor;

//array
let arraySize = 50;
let maxValue;
let array = [];

//number of array accesses
let counter = 0;

//sorting algorithm
let sort;

let sorting = false;
let done = false;

function setup(){
  initDraw();
  populate();
  SetSort();
  noLoop();
}

function initDraw(){
  startColor = color("orange");
  destColor = color("purple");

  let canvasContainer = document.getElementById("sorting-visualizer-canvas");
  canvasWidth = parseInt(getComputedStyle(canvasContainer).width,10);
  canvasHeight = parseInt(getComputedStyle(canvasContainer).height,10);
  let renderer = createCanvas(canvasWidth,canvasHeight);
  renderer.parent(canvasContainer);
}

function populate(){
  maxValue = 0;
  array = [];
  for(let i = 0; i < arraySize; i++){
    let value = int(random(1,arraySize+1));
    if(value > maxValue) maxValue = value;
    array.push(new Element(value,startColor));
  }
  if(!isLooping()){
    clear();
    drawArray();
  }
}

//drawing
function draw(){
  background(255);
  drawArray();
  if(sort.next().done)
    done = true;
}

function drawArray(){
  for(let x = 0; x < arraySize; x++)
    array[x].draw(x);
}

//ui
function ChangeSort(){
  if(sorting)
    Restart();
  else
    SetSort();
}
function SetSort(){
  switch(document.getElementById("sorting-visualizer-select").value) {
    case "Selection Sort":
      sort = selectionSort(array);
      break;
    case "Merge Sort":
      sort = mergeSort(array);
      break;
    default:
      break;
  }
}

function Play(){
  sorting = true;
  if(done)
    Restart();
  loop();
}

function Pause(){
  noLoop();
}

function Restart(){
  if(!isLooping())
    sorting = false;
  done = false;
  populate();
  SetSort();
}

function ChangeSize(){
  arraySize = document.getElementById("size-slider").value;
  Restart();
}

function ChangeSpeed(){
  let fr = document.getElementById("speed-slider").value
  setFrameRate(parseInt(fr));
}

//array made up of these
class Element{
  constructor(value,color){
    this.value = value;
    this.color = color;
    this.selected = false;
  }
  draw(index){
    if(this.selected){
      fill(color(225));
      this.selected = false;
    } else
      fill(this.color);
    noStroke();
    let width = canvasWidth/arraySize;
    let height = (canvasHeight-5)/maxValue*this.value;
    rect(index*width,canvasHeight-height,width,height);
  }
}
