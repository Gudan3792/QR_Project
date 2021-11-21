

window.onload = function() {
 
  var modal = {
     open : function(){
              $('#modal-wrapper').show();
            },
            close : function(){
              $('#modal-wrapper').hide();    
            }
          };
          $(document).on('click', '#modal-overlay', function(){
            window.history.back();
            document.getElementsByTagName('body')[0].style.overflow = 'scroll'; 
          }).on("click", "button[name='Cmodal']", function(){
            window.history.pushState({}, 'modal');
            modal.open();
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            
          }).on("click", '#clobutton', function(){
            window.history.back();
            document.getElementsByTagName('body')[0].style.overflow = 'scroll'; 
          });
          
          window.onpopstate = history.onpushstate = function() {
              if(window.location.href.split('/').pop().indexOf('modal')===-1){
                  modal.close(); // 현재의 모달을 닫는다.
              }
          }
}
