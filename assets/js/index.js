window.onload = function() {
  //Create iframe for chat
  var iframe = document.createElement('iframe');
  iframe.style = 'border: none; position: fixed; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 9123479812';
  iframe.src = 'https://s3.amazonaws.com/koalachat/plugin.html';
  iframe.id = 'plugin';
  document.body.appendChild(iframe);
}

