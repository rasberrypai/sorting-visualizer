function* selectionSort(array){
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
