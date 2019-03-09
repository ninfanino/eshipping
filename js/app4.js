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

  const refTerminos = firebase.database().ref("data/faqs");
  refTerminos.on('value', function(data){
    let objKey = Object.keys(data.val());
    
    for(obj in objKey){
      let key = objKey[obj];
      if(key == 'title') {
        $('.title').html(data.val()[key]);
      } else {
        //var str = data.val()[key].replace(/\n/g, '<br \/>')
        var str = data.val()[key].replace(/\n/g, '</p><p>');
        var arr = str.split('<p></p><p>');
        var str2 = arr.join('<p class="nuevo">');
        $("." + key).html('<p class="nuevo">' + str2 + '</p>');
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
