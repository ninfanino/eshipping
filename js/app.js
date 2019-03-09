$(function() {
  
  var config = {
    apiKey: "AIzaSyAJV8CbDt4aysJwLF8AlXA7q2PUA2-amq0",
    authDomain: "eshipping-c15b7.firebaseapp.com",
    databaseURL: "https://eshipping-c15b7.firebaseio.com",
    projectId: "eshipping-c15b7",
    storageBucket: "eshipping-c15b7.appspot.com",
    messagingSenderId: "276298360377"
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
        var str = data.val()[key].replace(/\n/g, '<br \/>')
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

  $(document).on('click', '.item-menu-mobile', function() {
      $('.open-menu-mobile').removeClass('open');
  });
});