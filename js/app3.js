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

  const refTerminos = firebase.database().ref("data/privacidad");
  refTerminos.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];
      if(key == 'title') {
        $('.title').html(data.val()[key]);
      } 
      if(key == 'text') {
        var str = data.val()[key].replace(/\n/g, '</p><p>');
        var arr = str.split('<p></p><p>');
        var str2 = arr.join('<p class="nuevo">');
        $("." + key).html('<p>' + str2 + '</p>');
      }
    }
  });

  $(document).on('click', '.menu-mobile', function() {
    $('.open-menu-mobile').addClass('open');
  });
  $(document).on('click', '.close-menu', function() {
    $('.open-menu-mobile').removeClass('open');
  }); 
  
});
