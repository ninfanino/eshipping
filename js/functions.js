(function() {

  var config = {
    apiKey: "AIzaSyAJV8CbDt4aysJwLF8AlXA7q2PUA2-amq0",
    authDomain: "eshipping-c15b7.firebaseapp.com",
    databaseURL: "https://eshipping-c15b7.firebaseio.com",
    projectId: "eshipping-c15b7",
    storageBucket: "eshipping-c15b7.appspot.com",
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
  		$('.pre-loader').addClass('show');
  		/**/$('.blurred-bg-container').addClass('hidden');
  		$('.container-web').removeClass('hidden');
  		$('.name-user').html(currentUser.email);

      $.ajax({
        url: 'inicio.html', 
        success: function(result){
          $('.pre-loader').removeClass('show');
          $(".content-section").html(result);
          const ref= firebase.database().ref("data/inicio");

          ref.on('value', function(data){
            let objKey = Object.keys(data.val());
            
            for(obj in objKey){
              let key = objKey[obj];
              if(key != 'url') {
                $("#" + key).val(data.val()[key]);
              } else {
                if(data.val()[key] != ''){
                  $('.img-preview-slider').html('<img src="' + data.val()[key] +'" />');
                  $('.txt-img-preview').addClass('hidden');
                }
              }
            }
          });
        }
      });
  	} else {
  		$('.blurred-bg-container').removeClass('hidden');
  		$('.container-web').addClass('hidden');
      $(".content-section").html('');
  	}
  
  });

  $(document).on('click', '.btn-menu', function() {
    $('.pre-loader').addClass('show');
    $('.btn-menu').removeClass('active');
    $(this).addClass('active')
    var url = $(this).attr('data-url') + '.html';
    var section = $(this).attr('data-url');
    $.ajax({url: url, success: function(result){
      $(".content-section").html(result);
      $('.pre-loader').removeClass('show');
      const ref= firebase.database().ref("data/" + section);

          ref.on('value', function(data){
            if(data.val() != null) {
              let objKey = Object.keys(data.val());
              
              for(obj in objKey){
                let key = objKey[obj];

                if((key != 'url') && (key != 'icono1') && (key != 'icono2') && (key != 'icono3')) {
                  $("#" + key).val(data.val()[key]);
                } else {
                  
                  if(data.val()[key] != ''){
                    $('.img-preview-slider[data-file="'+key+'"]').html('<img src="' + data.val()[key] +'" />');
                    $('.txt-img-preview').addClass('hidden');
                  }
                }
              }
            }
          });

    }});
  });

  

  $(document).on('click', '.input-file-trigger', function() {
     var attr = $(this).attr('data-file');
     $( ".input-file[data-file='"+attr+"']" ).focus();
     return false;
  });  
  
  $(document).on('change', '.input-file', function() {
      var attr = $(this).attr('data-file');
      $(".file-return[data-file='"+attr+"']").html($(this)[0].files[0].name);  
      $('.txt-img-preview').removeClass('hidden');
  });  

  //inicio ready
  $(document).on('click', '#save-inicio', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var text = $("#text").val();
      var file = $(".input-file")[0].files[0];

      var data = {
          title:title, 
          text:text
      };

      firebase.database().ref("data/inicio").update(data);

      if( $(".input-file")[0].files.length == 0 ){
          $('.pre-loader').removeClass('show');
      } else {
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

        
        subirImagenAFirebase(file, uploadTask, 'inicio', 'url');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            $('.pre-loader').removeClass('show');
          }
        );   
      } 
  });

  //terminos ready
  $(document).on('click', '#save-terminos', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var text = $("#text").val();

      var data = {
          title:title, 
          text:text
      };

      firebase.database().ref("data/terminos").update(data).then(() => {
          $('.pre-loader').removeClass('show');
      });
  });

  //faqs ready
  $(document).on('click', '#save-faqs', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var title1 = $("#title1").val();
      var title2 = $("#title2").val();
      var text = $("#text").val();
      var text2 = $("#text2").val();

      var data = {
          title:title, 
          title1:title1, 
          title2:title2, 
          text:text,
          text2:text2
      };

      firebase.database().ref("data/faqs").update(data).then(() => {
          $('.pre-loader').removeClass('show');
      });   
  });

  //privacidad ready
  $(document).on('click', '#save-privacidad', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var text = $("#text").val();

      var data = {
          title:title, 
          text:text
      };

      firebase.database().ref("data/privacidad").update(data).then(() => {
          $('.pre-loader').removeClass('show');
      });
  });

  //analytics ready
  $(document).on('click', '#save-analitics', function() {
      $('.pre-loader').addClass('show');
      var text = $("#text").val();

      var data = {
          text:text
      };

      firebase.database().ref("data/analitics").update(data).then(() => {
          $('.pre-loader').removeClass('show');
      });
  });

  //acerca ready
  $(document).on('click', '#save-acerca', function() {
      $('.pre-loader').addClass('show');

      var title = $("#title").val();
      var text = $("#text").val();
      var file = $("#file")[0].files[0];

      var titlebox1 = $("#titlebox1").val();
      var subtitlebox1 = $("#subtitlebox1").val();
      var videobox1 = $("#videobox1").val();
      var icono1 = $("#icono1")[0].files[0];

      var titlebox2 = $("#titlebox2").val();
      var subtitlebox2 = $("#subtitlebox2").val();
      var videobox2 = $("#videobox2").val();
      var icono2 = $("#icono2")[0].files[0];

      var titlebox3 = $("#titlebox3").val();
      var subtitlebox3 = $("#subtitlebox3").val();
      var videobox3 = $("#videobox3").val();
      var icono3 = $("#icono3")[0].files[0];

      var data = {
          title:title, 
          text:text,
          titlebox1:titlebox1,
          subtitlebox1:subtitlebox1,
          videobox1:videobox1,
          titlebox2:titlebox2,
          subtitlebox2:subtitlebox2,
          videobox2:videobox2,
          titlebox3:titlebox3,
          subtitlebox3:subtitlebox3,
          videobox3:videobox3
      };

      
      firebase.database().ref("data/acerca").update(data);

      var count = 0;

      if($("#file").val() != '') {
        count++;
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
        subirImagenAFirebase(file, uploadTask, 'acerca', 'url');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono1").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile1 = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask, 'acerca', 'icono1');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono2").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask, 'acerca', 'icono2');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono3").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask, 'acerca', 'icono3');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if(($("#file").val() == '') && ($("#icono1").val() == '') && ($("#icono2").val() == '') && ($("#icono3").val() == '')) {
        $('.pre-loader').removeClass('show');
      }
  });
  
  // envios ready
  $(document).on('click', '#save-envios', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var file = $("#file")[0].files[0];

      var titlebox1 = $("#titlebox1").val();
      var subtitlebox1 = $("#subtitlebox1").val();
      var descripcionbox1 = $("#descripcionbox1").val();
      var icono1 = $("#icono1")[0].files[0];

      var titlebox2 = $("#titlebox2").val();
      var subtitlebox2 = $("#subtitlebox2").val();
      var descripcionbox2 = $("#descripcionbox2").val();
      var icono2 = $("#icono2")[0].files[0];

      var titlebox3 = $("#titlebox3").val();
      var subtitlebox3 = $("#subtitlebox3").val();
      var descripcionbox3 = $("#descripcionbox3").val();
      var icono3 = $("#icono3")[0].files[0];

      var data = {
          title:title, 
          titlebox1:titlebox1,
          subtitlebox1:subtitlebox1,
          descripcionbox1:descripcionbox1,
          titlebox2:titlebox2,
          subtitlebox2:subtitlebox2,
          descripcionbox2:descripcionbox2,
          titlebox3:titlebox3,
          subtitlebox3:subtitlebox3,
          descripcionbox3:descripcionbox3
      };

      
      firebase.database().ref("data/envios").update(data);

      var count = 0;

      if($("#file").val() != '') {
        count++;
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
        subirImagenAFirebase(file, uploadTask, 'envios', 'url');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono1").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile1 = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask, 'envios', 'icono1');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono2").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask, 'envios', 'icono2');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono3").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask, 'envios', 'icono3');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if(($("#file").val() == '') && ($("#icono1").val() == '') && ($("#icono2").val() == '') && ($("#icono3").val() == '')) {
        $('.pre-loader').removeClass('show');
      }
  });


  $(document).on('click', '#save-tpl', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var file = $("#file")[0].files[0];

      var titlebox1 = $("#titlebox1").val();
      var subtitlebox1 = $("#subtitlebox1").val();
      var descripcionbox1 = $("#descripcionbox1").val();
      var icono1 = $("#icono1")[0].files[0];

      var titlebox2 = $("#titlebox2").val();
      var subtitlebox2 = $("#subtitlebox2").val();
      var descripcionbox2 = $("#descripcionbox2").val();
      var icono2 = $("#icono2")[0].files[0];

      var titlebox3 = $("#titlebox3").val();
      var subtitlebox3 = $("#subtitlebox3").val();
      var descripcionbox3 = $("#descripcionbox3").val();
      var icono3 = $("#icono3")[0].files[0];

      var data = {
          title:title, 
          titlebox1:titlebox1,
          subtitlebox1:subtitlebox1,
          descripcionbox1:descripcionbox1,
          titlebox2:titlebox2,
          subtitlebox2:subtitlebox2,
          descripcionbox2:descripcionbox2,
          titlebox3:titlebox3,
          subtitlebox3:subtitlebox3,
          descripcionbox3:descripcionbox3
      };

      
      firebase.database().ref("data/tpl").update(data);
      var count = 0;

      if($("#file").val() != '') {
        count++;
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
        subirImagenAFirebase(file, uploadTask, 'tpl', 'url');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono1").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile1 = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask, 'tpl', 'icono1');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono2").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask, 'tpl', 'icono2');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono3").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask, 'tpl', 'icono3');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if(($("#file").val() == '') && ($("#icono1").val() == '') && ($("#icono2").val() == '') && ($("#icono3").val() == '')) {
        $('.pre-loader').removeClass('show');
      }

  });

  $(document).on('click', '#save-consultoria', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var file = $("#file")[0].files[0];

      var titlebox1 = $("#titlebox1").val();
      var subtitlebox1 = $("#subtitlebox1").val();
      var descripcionbox1 = $("#descripcionbox1").val();
      var icono1 = $("#icono1")[0].files[0];

      var titlebox2 = $("#titlebox2").val();
      var subtitlebox2 = $("#subtitlebox2").val();
      var descripcionbox2 = $("#descripcionbox2").val();
      var icono2 = $("#icono2")[0].files[0];

      var titlebox3 = $("#titlebox3").val();
      var subtitlebox3 = $("#subtitlebox3").val();
      var descripcionbox3 = $("#descripcionbox3").val();
      var icono3 = $("#icono3")[0].files[0];

      var data = {
          title:title, 
          titlebox1:titlebox1,
          subtitlebox1:subtitlebox1,
          descripcionbox1:descripcionbox1,
          titlebox2:titlebox2,
          subtitlebox2:subtitlebox2,
          descripcionbox2:descripcionbox2,
          titlebox3:titlebox3,
          subtitlebox3:subtitlebox3,
          descripcionbox3:descripcionbox3
      };

      
      firebase.database().ref("data/consultoria").update(data);
      var count = 0;

      if($("#file").val() != '') {
        count++;
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
        subirImagenAFirebase(file, uploadTask, 'consultoria', 'url');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono1").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile1 = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask, 'consultoria', 'icono1');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono2").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask, 'consultoria', 'icono2');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if($("#icono3").val() != '') {
        count++;
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }
        var nameFile = guid();


        var uploadTask = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask, 'consultoria', 'icono3');

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            count--;
            if(count == 0) {
              $('.pre-loader').removeClass('show');
            }
          }
        );
      } 

      if(($("#file").val() == '') && ($("#icono1").val() == '') && ($("#icono2").val() == '') && ($("#icono3").val() == '')) {
        $('.pre-loader').removeClass('show');
      }

  });

  //contacto ready
  $(document).on('click', '#save-contacto', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var file = $(".input-file")[0].files[0];

      var data = {
          title:title
      };

      firebase.database().ref("data/contacto").update(data);

      if( $(".input-file")[0].files.length == 0 ){
        $('.pre-loader').removeClass('show');
      } else {
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

        
        subirImagenAFirebase(file, uploadTask, 'contacto', 'url');
        
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          null,
          function() {
            $('.pre-loader').removeClass('show');
          }
        );
      }
  });

  function subirImagenAFirebase(imagenASubir, uploadTask, page, type){
    uploadTask.on('state_changed',
      function(snapshot){
      //se va mostrando el progreso de la subida de la imagen
    }, function(error) {
      console.log("hubo un error");
    }, function() {
      var urlImg = imagenASubir.name;

      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         crearNodoEnBDFirebase( downloadURL, page, type );
       });
    });
  }

  function crearNodoEnBDFirebase(downloadURL, page, type) {
    if(type == 'url') {
      firebase.database().ref("data/" + page).update({url:downloadURL});
    }
    if(type == 'icono1') {
      firebase.database().ref("data/" + page).update({icono1:downloadURL});
    }
    if(type == 'icono2') {
      firebase.database().ref("data/" + page).update({icono2:downloadURL});
    }
    if(type == 'icono3') {
      firebase.database().ref("data/" + page).update({icono3:downloadURL});
    }   
  }

} ());
