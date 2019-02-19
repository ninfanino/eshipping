(function() {

  var config = {
    apiKey: "AIzaSyAJV8CbDt4aysJwLF8AlXA7q2PUA2-amq0",
    authDomain: "eshipping-c15b7.firebaseapp.com",
    databaseURL: "https://eshipping-c15b7.firebaseio.com",
    projectId: "eshipping-c15b7",
    storageBucket: "",
    messagingSenderId: "276298360377"
  };
  firebase.initializeApp(config);

  storageRef = firebase.storage().ref();
  
  $(document).on('click', '#btnLogin', function() {
      //Obtener email y pass
      const email = $("#txtEmail").val();
      const pass = $("#txtPassword").val();
      const auth = firebase.auth();
      // Sign in
      const promise = auth.signInWithEmailAndPassword(email, pass);
      
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
  	if(firebaseUser) {
  		var currentUser = firebase.auth().currentUser;
  		
  		/**/$('.blurred-bg-container').addClass('hidden');
  		$('.container-web').removeClass('hidden');
  		$('.name-user').html(currentUser.email);

      $.ajax({url: 'inicio.html', success: function(result){
        $(".content-section").html(result);
      }});
  	} else {
  		$('.blurred-bg-container').removeClass('hidden');
  		$('.container-web').addClass('hidden');
      $(".content-section").html('');
  	}
  
  });

  $(document).on('click', '.btn-menu', function() {
    $('.btn-menu').removeClass('active');
    $(this).addClass('active')
    var url = $(this).attr('data-url') + '.html';
    $.ajax({url: url, success: function(result){
      $(".content-section").html(result);
    }});
  });

  document.querySelector("html").classList.add('js');

  
        
  
  
  $(document).on('click', '.input-file-trigger', function() {
     $( ".input-file" ).focus();
     return false;
  });  
  
  $(document).on('change', '.input-file', function() {
      $(".file-return").html(this.value);  
  });  

  $(document).on('click', '#save-inicio', function() {
      var title = $("#title").val();
      var text = $("#text").val();
      var file = $("#file").files[0];

      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4();
      }
      var nameFile = guid();
      var uploadTask = storageRef.child('imagen/'+ nameFile).put(file);

      subirImagenAFirebase(file, uploadTask);
  });

  function subirImagenAFirebase(imagenASubir, uploadTask){
    uploadTask.on('state_changed',
      function(snapshot){
      //se va mostrando el progreso de la subida de la imagen
    }, function(error) {
      console.log("hubo un error");
    }, function() {
      var urlImg = imagenASubir.name;

      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         console.log('File available at', downloadURL);
         console.log("subiendo imagen");
         crearNodoEnBDFirebase( downloadURL);
       });
    });
  }

  function crearNodoEnBDFirebase(downloadURL) {
    const rootRef= firebase.database().ref("imagen/");
    const searchInfo = rootRef.orderByChild('email').equalTo(sessionStorage.getItem('user'));

    searchInfo.on("value", function(data) {
      var taskValue=data.val();
      var keys = Object.keys(taskValue);
      firebase.database().ref("imagen/").child(keys[0]).update({url:downloadURL});



    });
  }

} ());
