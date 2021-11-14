function iamport(n,p){
    //가맹점 식별코드
    IMP.init('imp72396912');
    IMP.request_pay({
        pg : 'kakaopay',
        pay_method : 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : n , //결제창에서 보여질 이름
        amount : p, //실제 결제되는 가격
    }, function(rsp) {
        console.log(rsp);
        if ( rsp.success ) {
            var msg = '결제가 완료되었습니다.';
            msg += '고유ID : ' + rsp.imp_uid;
            msg += '상점 거래ID : ' + rsp.merchant_uid;
            msg += '결제 금액 : ' + rsp.paid_amount;
            msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
             var msg = '결제에 실패하였습니다.';
             msg += '에러내용 : ' + rsp.error_msg;
        }
        alert(msg);
    });
}


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
            window.history.pushState({}, 'modal', '/modal');
            modal.open();
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            
          });
          
          window.onpopstate = history.onpushstate = function(e) {
              if(window.location.href.split('/').pop().indexOf('modal')===-1){ // 마지막 segment가 cards라면 모달이 아닌 리스트인 상태이어야한다.
                  modal.close(); // 현재의 모달을 닫는다.
              }
          }}