function loadScript(url, callback)
{
  // Adding the script tag to the head
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

var leLogic = function() {
  var oid = document.getElementById("koala-index").getAttribute("u");

  toggleFab();

  $.getScript("https://s3.amazonaws.com/koalachat/socket.io.js", function(){
    console.log("Socket.io Script loaded");
    //Write all socket io code here
    
  });

  //Load the visuals
  $('body').append('<div class="fabs"><div class="chat white"><div class="chat_login"><input id="email" name="chat_message" placeholder="Your Cool Email" class="chat_field chat_message"></input><input id="password" type="password" name="chat_message" placeholder="Your Strong Password" class="chat_field chat_message"></input><a href="#" id="email_login" class="button login">Login</a><a href="#" id="reg_options" class="button register">Register</a></div><div id="chat_converse" class="chat_converse"><span class="chat_msg_item chat_msg_item_admin">Hi! How may I be of service</span></div><div class="fab_field"><a id="fab_listen" class="fab"><i class="zmdi zmdi-mic-outline"></i></a><a id="fab_send" class="fab"><i class="zmdi zmdi-mail-send"></i></a><textarea id="chatSend" name="chat_message" placeholder="Pssst! Say something..." class="chat_field chat_message"></textarea></div></div><a id="prime" class="fab chathead-closed"><i class="prime zmdi"></i></a></div>');

  //Fab click
  $('#prime').click(function() {
    toggleFab();
  });

  //Toggle chat and links
  function toggleFab() {
    $('.prime').toggleClass('zmdi-close');
    $('.prime').parent().toggleClass('chathead-open');
    $('.prime').toggleClass('is-active');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab').toggleClass('is-visible');
  }

  //Increase Textarea on scroll height change
  $('#chatSend').on('keyup', function () {
      $(this).css('height', this.scrollHeight);
  });

  //User msg
  function userSend(text) {
    $('#chat_converse').append('<div class="chat_msg_item chat_msg_item_user">' + text + '</div>');
    $('#chatSend').val('');
    if ($('.chat_converse').height() >= 264) {
      $('.chat_converse').addClass('is-max');
    }
    $('.chat_converse').scrollTop($('.chat_converse')[0].scrollHeight);
    $('#chatSend').css('height', 40);
  }

  //Admin msg
  function adminSend(text) {
    $('#chat_converse').append('<div class="chat_msg_item chat_msg_item_admin">' + text + '</div>');
    if ($('.chat_converse').height() >= 264) {
      $('.chat_converse').addClass('is-max');
    }
    $('.chat_converse').scrollTop($('.chat_converse')[0].scrollHeight);
  }

  //Send input using enter and send key
  $('#chatSend').bind("enterChat", function(e) {
    userSend($('#chatSend').val());
  });

  $('#fab_send').bind("enterChat", function(e) {
    userSend($('#chatSend').val());
  });

  $('#chatSend').keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (jQuery.trim($('#chatSend').val()) !== '') {
        $(this).trigger("enterChat");
      }
    }
  });

  $('#fab_send').click(function(e) {
    if (jQuery.trim($('#chatSend').val()) !== '') {
      $(this).trigger("enterChat");
    }
  });

  //Listen user voice
  $('#fab_listen').click(function() {
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
      userSend(event.results[0][0].transcript, oid, vid);
    }
    recognition.start();
  });

  $('.chat_option').click(function(e) {
    $(this).toggleClass('is-dropped');
  });

  //Loader effect
  function loadBeat(beat) {
    beat ? $('.chat_loader').addClass('is-loading') : $('.chat_loader').removeClass('is-loading');
  }

  // Ripple effect
  var target, ink, d, x, y;
  $(".fab").click(function(e) {
    target = $(this);
    //create .ink element if it doesn't exist
    if (target.find(".ink").length == 0)
      target.prepend("<span class='ink'></span>");

    ink = target.find(".ink");
    //incase of quick double clicks stop the previous animation
    ink.removeClass("animate");

    //set size of .ink
    if (!ink.height() && !ink.width()) {
      //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
      d = Math.max(target.outerWidth(), target.outerHeight());
      ink.css({
        height: d,
        width: d
      });
    }

    //get click coordinates
    //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
    x = e.pageX - target.offset().left - ink.width() / 2;
    y = e.pageY - target.offset().top - ink.height() / 2;

    //set the position and add class .animate
    ink.css({
      top: y + 'px',
      left: x + 'px'
    }).addClass("animate");
  });

  //Cookies handler
  function createCookie(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  //User login
  function loginUser() {
    //THIS IS BAD CODING PRACTISE -_-
    $('.register_tip_social').remove();
    $('#gmail_login').remove();
    $('#fb_login').remove();
    $('.chat_login').prepend('<a href="http://localhost:4731/auth/facebook" id="fb_login" class="button fb_login">Facebook</a>');
    $('.chat_login').prepend('<a href="http://localhost:4731/auth/google" id="gmail_login" class="button gmail_login">Gmail</a>');
    $('.chat_login').prepend('<p class="register_tip_social">You could also login easily with your social media...</p>');
    
    hideChat(true);
    $('#email_login').click(function(e) {
      if($('#website').length > 0){
        $('.register_tip_social').remove();
        $('.chat_login_alert').remove();
        $('#gmail_login').remove();
        $('#fb_login').remove();  
        $('#website').remove();
        $('.register_tip_social').remove();
        $('#gmail_login').remove();
        $('#fb_login').remove();
        $('.chat_login').prepend('<a href="http://localhost:4731/auth/facebook" id="fb_login" class="button fb_login">Facebook</a>');
        $('.chat_login').prepend('<a href="http://localhost:4731/auth/google" id="gmail_login" class="button gmail_login">Gmail</a>');
        $('.chat_login').prepend('<p class="register_tip_social">You could also login easily with your social media...</p>');
      }
      else{
        $('.register_tip_social').remove();
        $('#gmail_login').remove();
        $('#fb_login').remove();
        $('.chat_login').prepend('<a href="http://localhost:4731/auth/facebook" id="fb_login" class="button fb_login">Facebook</a>');
        $('.chat_login').prepend('<a href="http://localhost:4731/auth/google" id="gmail_login" class="button gmail_login">Gmail</a>');
        $('.chat_login').prepend('<p class="register_tip_social">You could also login easily with your social media...</p>');
        
        var email = $('#email').val();
        var password = $('#password').val();
        if (jQuery.trim(email) !== '' && validateEmail(email) && validatePassword(password)) {
          loadBeat(true);
          createCookie('saved_email', email, 100);
          loadBeat(false);
          $('#email').val('');
          $('#password').val('');
          hideChat(false);
        } 
        else if(!validateEmail(email) && !validatePassword(password)){
          $('.chat_login_alert').remove();
          var validationText = 'Hmmmm sneaky sneaky! 😉 Type in your email and password to get in... ';
          $('.chat_login').prepend('<div class="chat_login_alert">' + validationText +  '</div>');
        }
        else if(!validateEmail(email)){
          $('.chat_login_alert').remove();
          var validationText = 'Derp! Seems like this email id is not valid. Let’s try again… 😊';
          $('.chat_login').prepend('<div class="chat_login_alert">' + validationText +  '</div>');
        } 
        else if(!validatePassword(password)){
          $('.chat_login_alert').remove();
          var validationText = 'Derp! Seems like your password is a little too short. Let’s make it longer shall we… 😊';
          $('.chat_login').prepend('<div class="chat_login_alert">' + validationText +  '</div>');
        }
      }
    });
  }

  //Show Registration options
  $('#reg_options').click(function (e) {
    if($('#website').length > 0){
      var website = $('#website').val();
      var email = $('#email').val();
      var password = $('#password').val();
      if (jQuery.trim(email) !== '' && validateEmail(email) && validatePassword(password) && validateWebsite(website)) {
        loadBeat(true);
        createCookie('saved_email', email, 100);
        createCookie('saved_website', email, 100);
        loadBeat(false);
        $('#website').val('');
        $('#email').val('');
        $('#password').val('');
        hideChat(false);
      } 
      else if(!validateEmail(email)){
        $('.chat_login_alert').remove();
        var validationText = 'Derp! Seems like this email id is not valid. Let’s try again… 😊';
        $('.chat_login').prepend('<div class="chat_login_alert">' + validationText +  '</div>');
      } 
      else if(!validatePassword(password)){
        $('.chat_login_alert').remove();
        var validationText = 'Derp! Seems like your password is a little too short. Let’s make it longer shall we… 😊';
        $('.chat_login').prepend('<div class="chat_login_alert">' + validationText +  '</div>');
      }
    }
    else{
      $('.chat_login_alert').remove();
      $('.register_tip_social').remove();
      $('#gmail_login').remove();
      $('#fb_login').remove();
      $('#website').remove();
      $('.chat_login').prepend('<input id="website" name="website" placeholder="Your Website Link" class="chat_field chat_message"></input>');
      $('.chat_login').prepend('<a href="http://localhost:4731/auth/facebook" id="fb_login" class="button fb_login">Facebook</a>');
      $('.chat_login').prepend('<a href="http://localhost:4731/auth/google" id="gmail_login" class="button gmail_login">Gmail</a>');
      $('.chat_login').prepend('<p class="register_tip_social">You could also register easily with your social media...</p>');
    }
  });

  //Login using enter and send key
  $('#email').keypress(function (e) {
    var key = e.which;
    if(key == 13)
      {
        $('#email_login').click();
        return false;  
      }
  });

  $('#password').keypress(function (e) {
    var key = e.which;
    if(key == 13)
    {
      $('#email_login').click();
      return false;  
    }
  });

  function hideChat(hide) {
    if (hide) {
      $('.chat_converse').css('display', 'none');
      $('.fab_field').css('display', 'none');
    } else {
      $('.chat_login').css('display', 'none');
      $('.chat_converse').css('display', 'block');
      $('.fab_field').css('display', 'inline-block');
    }
  }

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  function validateWebsite(website) {
    var websiteReg = /^([\w-\.]+\.)+[\w-]{2,4})?$/;
    if (!websiteReg.test(website)) {
      return false;
    } else {
      return true;
    }
  }

  function validatePassword(password) {
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  }

  if (readCookie('saved_email') === null && readCookie('saved_website') === null) {
    loginUser();
  } else {
    hideChat(false);
  }
};

loadScript("https://s3.amazonaws.com/koalachat/jquery.min.js", leLogic);