let canvasSize = 750;
let arraySize = 50;
let array = [];

let startColor;
let destColor;

let counter = 0;
let sort;

function setup(){
  createCanvas(canvasSize,canvasSize);
  background(255);
  populate();
  sort = selectionSort();
}

function draw(){
  background(255);
  drawArray();
  if(!sort.next().done) {
    counter++;
  } else {
    console.log(counter);
    drawArray();
    noLoop();
  }
}

function populate(){
  startColor = color("orange");
  destColor = color("purple");
  for(let i = 0; i < arraySize; i++)
    array.push(new Element(int(random(1,arraySize+1)),startColor));
}
function drawArray(){
  for(let x = 0; x < arraySize; x++)
    array[x].draw(x);
}
function* selectionSort(){
  for(let j = 0; j < arraySize; j++){
    let min = j;
    for(let i = j; i < arraySize; i++){
      array[i].selected = true;
      if(array[i].value < array[min].value)
        min = i;
      yield;
    }
    let tmp = array[j].value;
    array[j].value = array[min].value;
    array[min].value = tmp;
    array[j].color = lerpColor(startColor,destColor,1/arraySize*j);
  }
  return;
}

function* mergeSort(start, end){
  if(start < end){
      let mid = Math.floor((start+end)/2);
      yield * mergeSort(start,mid);
      yield * mergeSort(mid+1,end);
      yield * merge(start,mid,end);
  }
  return;
}

function* merge(start, mid, end) {
    let i = start;
    let j = mid+1;
    let k = 0;
    let tmp = new Array(end-start+1);
    while(i <= mid && j <= end){
        if(array[i].value <= array[j].value){
            tmp[k] = array[i];
            array[i].selected = true;
            yield;
            i++;
        } else {
            tmp[k] = array[j];
            array[j].selected = true;
            yield;
            j++;
        }
        k++;
    }
    while(i <= mid){
        tmp[k] = array[i];
        array[i].selected = true;
        yield;
        i++;
        k++;
    }
    while(j <= end){
        tmp[k] = array[j];
        array[j].selected = true;
        yield;
        j++;
        k++;
    }
    for(let i = start; i <= end; i++){
        array[i] = tmp[i-start];
        array[i].color = lerpColor(startColor,destColor,1/arraySize*i);
        yield;
    }
}

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
    let width = canvasSize/arraySize;
    let height = canvasSize/arraySize*this.value;
    rect(index*width,canvasSize-height,width,height);
  }
}
