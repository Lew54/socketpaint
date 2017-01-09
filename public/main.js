$(function () {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var isMouseDown = false;
  var socket = io();

  canvas.addEventListener('mousemove', function (evt) {
    if (isMouseDown) {
      var rect = canvas.getBoundingClientRect();
      var x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
      var y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
      socket.emit('position', { xPos: x, yPos: y });
      console.log("emiiting");
    }
  }, false);

   canvas.addEventListener('mousedown', function (evt) {
     isMouseDown = true;
   }, false);

      canvas.addEventListener('mouseup', function (evt) {
     isMouseDown = false;
   }, false);

  socket.on('enemyPos', function (data) {
    console.log(data);
    context.fillRect(data.xPos, data.yPos, 5, 5);
  });

});
