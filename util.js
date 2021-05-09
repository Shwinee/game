//     -util-
function add2str(start, x, added){
  let out = start;
  for (let i = x; i > 0; i--){
    out+=added;
  }
  return out;
}

function getEle(id) {
  return document.getElementById(id);
}

function mazp(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return this.constrain(newval, start2, stop2);
  } else {
    return this.constrain(newval, stop2, start2);
  }
}

function maxOfArr(numArray) {
  return Math.max.apply(null, numArray);
}
function minOfArr(numArray) {
  return Math.min.apply(null, numArray);
}
function rng(min, max){
  return Math.random() * max + min;
}

function clearCanvas(context, canvas) {
  context.rect(0, 0, canvas.width, canvas.height);
  // context.fill();
  var w = canvas.width;
  canvas.width = w;
}