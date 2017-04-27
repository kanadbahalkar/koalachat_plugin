window.onload = function() {
  //Create iframe for chat
  var iframe = document.createElement('iframe');
  iframe.style = 'width: 110px; height: 110px; max-height: 700px; border: none; position: fixed; right: 0; bottom: 0; z-index: 9123479812; display: none;';
  iframe.src = 'https://s3.amazonaws.com/koalachat/plugin.html';
  if(window.parent.document.getElementById('koala-index').getAttribute('a')) {
    iframe.name = window.parent.document.getElementById('koala-index').getAttribute('u') + '|'
                + window.parent.document.getElementById('koala-index').getAttribute('a') + '|' 
                + window.parent.document.getElementById('koala-index').getAttribute('c');
  }
  else {
    iframe.name = window.parent.document.getElementById('koala-index').getAttribute('u');
  }
  iframe.id = 'koala-plugin';
  document.body.appendChild(iframe);

  //Show iframe thumbnail
  document.getElementById('koala-plugin').style.display = 'initial';

  //Notification Badge
  var notifications = 0;
  var badge = document.createElement('div');
  badge.style = 'width: 24px; height: 24px; background: #ff3333; border-radius: 12px; border: none; position: fixed; right: 35px; bottom: 85px; visibility: hidden; text-align: center; line-height: 24px !important; color: white; font: 14px "Helvetica Neue", sans-serif; z-index: 9123479813';
  badge.id = 'koala-notification-badge';
  badge.innerHTML = notifications;
  document.body.appendChild(badge);

  // Create IE + others compatible event handler
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent,function(e) {
    if(e.data == "toggleHeight" && e.origin == "https://s3.amazonaws.com"){
      //Toggle height of the Chat iFrame
      if(document.getElementById('koala-plugin').style.width == '380px'){
          document.getElementById('koala-plugin').style.width = '110px';
          document.getElementById('koala-plugin').style.height = '110px';
          if(notifications > 0){
            document.getElementById('koala-notification-badge').style.visibility = 'visible';
            document.getElementById('koala-notification-badge').innerHTML = notifications;
          }
      }
      else{
          document.getElementById('koala-plugin').style.width = '380px';
          document.getElementById('koala-plugin').style.height = '100%';
          document.getElementById('koala-notification-badge').style.visibility = 'hidden';
          notifications = 0;
      }
    }

    if(e.data == "notification" && document.getElementById('koala-plugin').style.width == '110px' && e.origin == "https://s3.amazonaws.com"){
      notifications += 1;
      document.getElementById('koala-notification-badge').style.visibility = 'visible';
      document.getElementById('koala-notification-badge').innerHTML = notifications;
    }

    if(e.data == "disable" && e.origin == "https://s3.amazonaws.com"){
      document.getElementById('koala-plugin').style.display = 'none';
    }
    
    if(e.data == "enable" && e.origin == "https://s3.amazonaws.com"){
      document.getElementById('koala-plugin').style.display = 'initial';
    }
    
  },false);
}