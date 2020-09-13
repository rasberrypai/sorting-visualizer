function* mergeSort(array, start = 0, end = array.length -1){
  if(start < end){
      let mid = Math.floor((start+end)/2);
      yield * mergeSort(array, start,mid);
      yield * mergeSort(array, mid+1,end);
      yield * merge(array, start,mid,end);
  }
  return;
}

function* merge(array, start, mid, end) {
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
