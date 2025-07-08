
function pitchCallback() {
  console.log('pitchCallback');
}

function a(pitchCallback) {
  b(pitchCallback);
}
function b(pitchCallback) {
  c(pitchCallback);
}
function c(pitchCallback) {
  pitchCallback();
}
a(pitchCallback);