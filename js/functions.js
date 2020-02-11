(function() {

  var config = {
    apiKey: "AIzaSyCCtVQwtdcD12OS5Rio-FETZFWWpjqxWX4",
    authDomain: "eshipping-302cc.firebaseapp.com",
    databaseURL: "https://eshipping-302cc.firebaseio.com",
    projectId: "eshipping-302cc",
    storageBucket: "eshipping-302cc.appspot.com",
    messagingSenderId: "658152940271"
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
  		
  		$('.pre-loader').addClass('show');
  		$('.blurred-bg-container').addClass('hidden');
  		$('.container-web').removeClass('hidden');
  		

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

  $(document).on('click', '.logout', function() {
      firebase.auth().signOut();
      $('.blurred-bg-container').removeClass('hidden');
      $('.container-web').addClass('hidden');
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

                if((key != 'url') && (key != 'icono1') && (key != 'icono2') && (key != 'icono3') && (key != 'icono4') && (key != 'icono5') && (key != 'icono6') && (key != 'icono7')) {
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
      //var text = $("#text").val();
      var file = $(".input-file")[0].files[0];

      var data = {
          title:title
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


        var uploadTask1 = storageRef.child('imagen/'+ nameFile).put(file);

        
        subirImagenAFirebase(file, uploadTask1, 'inicio', 'url');

        uploadTask1.on(
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
      var legend = $("#legend").val();

      var data = {
          title:title, 
          text:text,
          legend:legend
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
      var icono1 = $("#icono1")[0].files[0];

      var titlebox2 = $("#titlebox2").val();
      var subtitlebox2 = $("#subtitlebox2").val();
      var icono2 = $("#icono2")[0].files[0];

      var titlebox3 = $("#titlebox3").val();
      var subtitlebox3 = $("#subtitlebox3").val();
      var icono3 = $("#icono3")[0].files[0];

      var data = {
          title:title, 
          text:text,
          titlebox1:titlebox1,
          subtitlebox1:subtitlebox1,
          titlebox2:titlebox2,
          subtitlebox2:subtitlebox2,
          titlebox3:titlebox3,
          subtitlebox3:subtitlebox3
      };

      
      firebase.database().ref("data/acerca").update(data);

      var count = 0;
      function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4();
        }

      if($("#file").val() != '') {
        count++;
        
        var nameFile = guid();


        var uploadTask2 = storageRef.child('imagen/'+ nameFile).put(file);
        subirImagenAFirebase(file, uploadTask2, 'acerca', 'url');

        uploadTask2.on(
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
        
        var nameFile1 = guid();


        var uploadTask3 = storageRef.child('imagen/'+ nameFile1).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask3, 'acerca', 'icono1');

        uploadTask3.on(
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
        
        var nameFile = guid();


        var uploadTask4 = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask4, 'acerca', 'icono2');

        uploadTask4.on(
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


        var uploadTask5 = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask5, 'acerca', 'icono3');

        uploadTask5.on(
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

  //casos exito ready
  $(document).on('click', '#save-casos', function() {
    $('.pre-loader').addClass('show');

    var title = $("#title").val();
    var text = $("#text").val();
    var file = $("#file")[0].files[0];

    var titlebox1 = $("#titlebox1").val();
    var subtitlebox1 = $("#subtitlebox1").val();
    var icono1 = $("#icono1")[0].files[0];

    var titlebox2 = $("#titlebox2").val();
    var subtitlebox2 = $("#subtitlebox2").val();
    var icono2 = $("#icono2")[0].files[0];

    var titlebox3 = $("#titlebox3").val();
    var subtitlebox3 = $("#subtitlebox3").val();
    var icono3 = $("#icono3")[0].files[0];

    var titlebox4 = $("#titlebox4").val();
    var subtitlebox4 = $("#subtitlebox4").val();
    var icono4 = $("#icono4")[0].files[0];

    var titlebox5 = $("#titlebox5").val();
    var subtitlebox5 = $("#subtitlebox5").val();
    var icono5 = $("#icono5")[0].files[0];

    var titlebox6 = $("#titlebox6").val();
    var subtitlebox6 = $("#subtitlebox6").val();
    var icono6 = $("#icono6")[0].files[0];

    var data = {
        title:title, 
        text:text,
        titlebox1:titlebox1,
        subtitlebox1:subtitlebox1,
        titlebox2:titlebox2,
        subtitlebox2:subtitlebox2,
        titlebox3:titlebox3,
        subtitlebox3:subtitlebox3,
        titlebox4:titlebox4,
        subtitlebox4:subtitlebox4,
        titlebox5:titlebox5,
        subtitlebox5:subtitlebox5,
        titlebox6:titlebox6,
        subtitlebox6:subtitlebox6,
    };

    
    firebase.database().ref("data/casos").update(data);

    var count = 0;
    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4();
      }

    if($("#file").val() != '') {
      count++;
      
      var nameFile = guid();


      var uploadTask2 = storageRef.child('imagen/'+ nameFile).put(file);
      subirImagenAFirebase(file, uploadTask2, 'casos', 'url');

      uploadTask2.on(
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
      
      var nameFile1 = guid();


      var uploadTask3 = storageRef.child('imagen/'+ nameFile1).put(icono1);

      
      subirImagenAFirebase(icono1, uploadTask3, 'casos', 'icono1');

      uploadTask3.on(
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
      
      var nameFile = guid();


      var uploadTask4 = storageRef.child('imagen/'+ nameFile).put(icono2);

      
      subirImagenAFirebase(icono2, uploadTask4, 'casos', 'icono2');

      uploadTask4.on(
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


      var uploadTask5 = storageRef.child('imagen/'+ nameFile).put(icono3);

      
      subirImagenAFirebase(icono3, uploadTask5, 'casos', 'icono3');

      uploadTask5.on(
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

    if($("#icono4").val() != '') {
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


      var uploadTask6 = storageRef.child('imagen/'+ nameFile).put(icono4);

      
      subirImagenAFirebase(icono4, uploadTask6, 'casos', 'icono4');

      uploadTask6.on(
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

    if($("#icono5").val() != '') {
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


      var uploadTask7 = storageRef.child('imagen/'+ nameFile).put(icono5);

      
      subirImagenAFirebase(icono5, uploadTask7, 'casos', 'icono5');

      uploadTask7.on(
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

    if($("#icono6").val() != '') {
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


      var uploadTask8 = storageRef.child('imagen/'+ nameFile).put(icono3);

      
      subirImagenAFirebase(icono6, uploadTask8, 'casos', 'icono6');

      uploadTask8.on(
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

    if(($("#file").val() == '') && ($("#icono1").val() == '') && ($("#icono2").val() == '') && ($("#icono3").val() == '') && ($("#icono4").val() == '') && ($("#icono5").val() == '') && ($("#icono6").val() == '')) {
      $('.pre-loader').removeClass('show');
    }
});
  
  // envios ready
  $(document).on('click', '#save-envios', function() {
      $('.pre-loader').addClass('show');
      var title = $("#title").val();
      var subtitle = $("#subtitle").val();
      var slogan = $("#slogan").val();
      var video = $("#video").val();
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
          subtitle:subtitle, 
          video:video, 
          slogan:slogan, 
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


        var uploadTask6 = storageRef.child('imagen/'+ nameFile).put(file);
        subirImagenAFirebase(file, uploadTask6, 'envios', 'url');

        uploadTask6.on(
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
        var nameFile = guid();


        var uploadTask7 = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask7, 'envios', 'icono1');

        uploadTask7.on(
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


        var uploadTask8 = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask8, 'envios', 'icono2');

        uploadTask8.on(
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


        var uploadTask9 = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask9, 'envios', 'icono3');

        uploadTask9.on(
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

      var titlebox4 = $("#titlebox4").val();
      var subtitlebox4 = $("#subtitlebox4").val();
      var descripcionbox4 = $("#descripcionbox4").val();
      var icono4 = $("#icono4")[0].files[0];

      var titlebox5 = $("#titlebox5").val();
      var subtitlebox5 = $("#subtitlebox5").val();
      var descripcionbox5 = $("#descripcionbox5").val();
      var icono5 = $("#icono5")[0].files[0];

      var titlebox6 = $("#titlebox6").val();
      var subtitlebox6 = $("#subtitlebox6").val();
      var descripcionbox6 = $("#descripcionbox6").val();
      var icono6 = $("#icono6")[0].files[0];

      var titlebox7 = $("#titlebox7").val();
      var subtitlebox7 = $("#subtitlebox7").val();
      var descripcionbox7 = $("#descripcionbox7").val();
      var icono7 = $("#icono7")[0].files[0];

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
          descripcionbox3:descripcionbox3,
          titlebox4:titlebox4,
          subtitlebox4:subtitlebox4,
          descripcionbox4:descripcionbox4,
          titlebox5:titlebox5,
          subtitlebox5:subtitlebox5,
          descripcionbox5:descripcionbox5,
          titlebox6:titlebox6,
          subtitlebox6:subtitlebox6,
          descripcionbox6:descripcionbox6,
          titlebox7:titlebox7,
          subtitlebox7:subtitlebox7,
          descripcionbox7:descripcionbox7
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


        var uploadTask10 = storageRef.child('imagen/'+ nameFile).put(file);
        subirImagenAFirebase(file, uploadTask10, 'tpl', 'url');

        uploadTask10.on(
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
        var nameFile = guid();


        var uploadTask11 = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask11, 'tpl', 'icono1');

        uploadTask11.on(
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


        var uploadTask12 = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask12, 'tpl', 'icono2');

        uploadTask12.on(
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


        var uploadTask13 = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask13, 'tpl', 'icono3');

        uploadTask13.on(
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

      if($("#icono4").val() != '') {
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


        var uploadTask14 = storageRef.child('imagen/'+ nameFile).put(icono4);

        
        subirImagenAFirebase(icono4, uploadTask14, 'tpl', 'icono4');

        uploadTask14.on(
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

      if($("#icono5").val() != '') {
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


        var uploadTask15 = storageRef.child('imagen/'+ nameFile).put(icono5);

        
        subirImagenAFirebase(icono5, uploadTask15, 'tpl', 'icono5');

        uploadTask15.on(
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

      if($("#icono6").val() != '') {
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


        var uploadTask16 = storageRef.child('imagen/'+ nameFile).put(icono6);

        
        subirImagenAFirebase(icono6, uploadTask16, 'tpl', 'icono6');

        uploadTask16.on(
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

      if($("#icono7").val() != '') {
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


        var uploadTask17 = storageRef.child('imagen/'+ nameFile).put(icono7);

        
        subirImagenAFirebase(icono7, uploadTask17, 'tpl', 'icono7');

        uploadTask17.on(
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

      if(($("#file").val() == '') && ($("#icono1").val() == '') && ($("#icono2").val() == '') && ($("#icono3").val() == '') && ($("#icono4").val() == '') && ($("#icono5").val() == '') && ($("#icono6").val() == '') && ($("#icono7").val() == '')) {
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
        console.log('file consultoria');
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


        var uploadTask18 = storageRef.child('imagen/'+ nameFile).put(file);
        subirImagenAFirebase(file, uploadTask18, 'consultoria', 'url');

        uploadTask18.on(
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
        var nameFile = guid();


        var uploadTask19 = storageRef.child('imagen/'+ nameFile).put(icono1);

        
        subirImagenAFirebase(icono1, uploadTask19, 'consultoria', 'icono1');

        uploadTask19.on(
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


        var uploadTask20 = storageRef.child('imagen/'+ nameFile).put(icono2);

        
        subirImagenAFirebase(icono2, uploadTask20, 'consultoria', 'icono2');

        uploadTask20.on(
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


        var uploadTask21 = storageRef.child('imagen/'+ nameFile).put(icono3);

        
        subirImagenAFirebase(icono3, uploadTask21, 'consultoria', 'icono3');

        uploadTask21.on(
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
      var subtitle = $("#subtitle").val();
      var file = $(".input-file")[0].files[0];

      var data = {
          title:title,
          subtitle:subtitle
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


        var uploadTask22 = storageRef.child('imagen/'+ nameFile).put(file);

        
        subirImagenAFirebase(file, uploadTask22, 'contacto', 'url');
        
        uploadTask22.on(
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
    console.log(page);
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
    if(type == 'icono4') {
      firebase.database().ref("data/" + page).update({icono4:downloadURL});
    } 
    if(type == 'icono5') {
      firebase.database().ref("data/" + page).update({icono5:downloadURL});
    } 
    if(type == 'icono6') {
      firebase.database().ref("data/" + page).update({icono6:downloadURL});
    } 
    if(type == 'icono7') {
      firebase.database().ref("data/" + page).update({icono7:downloadURL});
    }   
  }

} ());
