$(function() {
  
  var config = {
    apiKey: "AIzaSyCCtVQwtdcD12OS5Rio-FETZFWWpjqxWX4",
    authDomain: "eshipping-302cc.firebaseapp.com",
    databaseURL: "https://eshipping-302cc.firebaseio.com",
    projectId: "eshipping-302cc",
    storageBucket: "eshipping-302cc.appspot.com",
    messagingSenderId: "658152940271"
  };
  firebase.initializeApp(config);

  const refInicio = firebase.database().ref("data/inicio");
  refInicio.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];
      if(key == 'title') {
        $('.title-home').html(data.val()[key]);
      } 
      if(key == 'url') {
        var url = 'url('+data.val()[key]+')';
        $('.container-portada').css('background-image', url);
      }
    }
  });

  const refAcerca = firebase.database().ref("data/acerca");
  refAcerca.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];

      if(key != 'url' && key != 'icono1' && key != 'icono2' && key != 'icono3') {
        $(".section-acerca ." + key).html(data.val()[key]);
      } else {
        if(key == 'url'){
          $('.section-acerca .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" class="clip-nosotros"/>');
        } else {
          $('.section-acerca .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
        }
      } 
    }
  });

  const refEnvios = firebase.database().ref("data/envios");
  refEnvios.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];

      if(key != 'url' && key != 'icono1' && key != 'icono2' && key != 'icono3') {
        if(key == 'titlebox1' && data.val()[key] == 0) {
          $(".section-envios .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox2' && data.val()[key] == 0) {
          $(".section-envios .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox3' && data.val()[key] == 0) {
          $(".section-envios .box-" + key).addClass('hidden');
        }
        var str = data.val()[key].replace(/\n/g, '<br \/>');
        $(".section-envios ." + key).html(str);
      } else {
        if(key == 'url'){
          $('.section-envios .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" class="clip-envios"/>');
        } else {
          $('.section-envios .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
        }
      } 
    }
  });

  const refTpl = firebase.database().ref("data/tpl");
  refTpl.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];

      if(key != 'url' && key != 'icono1' && key != 'icono2' && key != 'icono3' && key != 'icono4' && key != 'icono5' && key != 'icono6' && key != 'icono7') {
        if(key == 'titlebox1' && data.val()[key] == 0) {
          $(".section-tpl .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox2' && data.val()[key] == 0) {
          $(".section-tpl .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox3' && data.val()[key] == 0) {
          $(".section-tpl .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox4' && data.val()[key] == 0) {
          $(".section-tpl .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox5' && data.val()[key] == 0) {
          $(".section-tpl .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox6' && data.val()[key] == 0) {
          $(".section-tpl .box-" + key).addClass('hidden');
        }
        var str = data.val()[key].replace('*', '</p><p>*');

        $(".section-tpl ." + key).html('<p>' + str + '</p>');
      } else {
        if(key == 'url'){
          $('.section-tpl .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
        } else {
          $('.section-tpl .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
        }
      } 
    }
  });

  const refConsultoria = firebase.database().ref("data/consultoria");
  refConsultoria.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];

      if(key != 'url' && key != 'icono1' && key != 'icono2' && key != 'icono3' && key != 'icono4' && key != 'icono5' && key != 'icono6' && key != 'icono7') {
        if(key == 'titlebox1' && data.val()[key] == 0) {
          $(".section-consultoria .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox2' && data.val()[key] == 0) {
          $(".section-consultoria .box-" + key).addClass('hidden');
        }
        if(key == 'titlebox3' && data.val()[key] == 0) {
          $(".section-consultoria .box-" + key).addClass('hidden');
        }
        var str = data.val()[key].replace(/\n/g, '<br \/>')

        $(".section-consultoria ." + key).html('<p>' + str + '</p>');
      } else {
        if(key == 'url'){
          $('.section-consultoria .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
        } else {
          $('.section-consultoria .img[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
        }
      } 
    }
  });

  const refContacto = firebase.database().ref("data/contacto");
  refContacto.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];

      if(key != 'url') {
        $(".section-contacto ." + key).html(data.val()[key]);
      } else {
         var url = 'url('+data.val()[key]+')';
         $('.mask-contacto').css('background-image', url);
      } 
    }
  });

  $(document).on('click', '.menu-mobile', function() {
    $('.open-menu-mobile').addClass('open');
  });
  $(document).on('click', '.close-menu', function() {
    $('.open-menu-mobile').removeClass('open');
  }); 

  $(document).on('click', '.logo', function() {
    document.getElementById('home').scrollIntoView();
  });
  
  $(document).on('click', '.link-envios', function() {
    document.getElementById('section-envios').scrollIntoView();
    $('.panel').css({'opacity':'1', 'background': '#EA6424'});

    setTimeout(function(){ 
      $('.panel').css({'opacity':'0', 'background': '#FFF'}); 
    }, 800);
  });

  $(document).on('click', '.link-tpl', function() {
    document.getElementById('section-tpl').scrollIntoView();
    $('.panel').css({'opacity':'1', 'background': '#3A2C7C'});

    setTimeout(function(){ 
      $('.panel').css({'opacity':'0', 'background': '#FFF'}); 
    }, 800);
  });

  $(document).on('click', '.link-consultoria', function() {
    document.getElementById('section-consultoria').scrollIntoView();
    $('.panel').css({'opacity':'1', 'background': '#FCB72C'});

    setTimeout(function(){ 
      $('.panel').css({'opacity':'0', 'background': '#FFF'}); 
    }, 800);
  });

  $(document).on('click', '.link-contacto', function() {
    document.getElementById('section-contacto').scrollIntoView();
    $('.panel').css({'opacity':'1', 'background': '#3A2C7C'});

    setTimeout(function(){ 
      $('.panel').css({'opacity':'0', 'background': '#FFF'}); 
    }, 800);
  });

  $(document).on('click', '.item-menu-mobile', function() {
      $('.open-menu-mobile').removeClass('open');
  });

  $(document).on('click', '.open-form', function() {
    $('.form-chat').removeClass('hidden');
  });

  $(document).on('click', '.btn-chat', function() {
      var data = $('.num-chat').val();

      if(data != "") {
        $('.contact-msj').html('');
        $.ajax({
            type: "POST",
            url: "phone.php",
            data: data,
            success: function(data){
                $('.form-chat').addClass('hidden');
                $('.phone-send').removeClass('hidden');

                setTimeout(function(){ 
                  $('.msj-send').removeClass('hidden'); 
                }, 1200);
            }
        });
      } 
  });

  $(document).on('click', '.close-chat', function() {
    $('.form-chat').addClass('hidden');
    $('.phone-send').addClass('hidden');
    $('.msj-send').addClass('hidden');
    $('.num-chat').val('');
  });


  $(document).on('click', '.btn-send', function() {
      var name = $('#name').val();
      var email = $('#email').val();
      var telefono = $('#telefono').val();
      var mensaje = $('#mensaje').val();

      var data = {
        name: name,
        email: email,
        telefono: telefono,
        mensaje: mensaje
      };

      console.log(data);

      if(name != "" && email != "" && telefono != "" && mensaje != "") {
        $('.contact-msj').html('');
        $.ajax({
            type: "POST",
            url: "email.php",
            data: data,
            success: function(data){
                $('.contact-msj').html(data);
            }
        });
      } else {
        $('.contact-msj').html('Falta información');
      }
  });

  $('.content-part.part-tese').addClass('show');
  $('.gallery_container').gallery_slider({imgNum: 27});

});
