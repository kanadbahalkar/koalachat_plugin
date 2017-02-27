window.onload = function() {
  //Create iframe for chat
  var iframe = document.createElement('iframe');
  iframe.style = 'border: none; position: fixed; right: 0; bottom: 0; z-index: 9123479812';
  // iframe.src = 'https://s3.amazonaws.com/koalachat/plugin.html';
  iframe.src = '../../plugin.html';
  iframe.name = window.parent.document.getElementById('koala-index').getAttribute('u'); 
  iframe.id = 'koala-plugin';
  document.body.appendChild(iframe);
}

