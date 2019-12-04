$(function(){

  function buildHTML(message){
  
    if (message.image !== null) {img = `<img src="${message.image.url}">`} 
    var imag = `
        <p class="lower-message__content"></p>
        <img class="lower-message__image" src="${message.image}">`

   
    var basehtml = `
    <div class="message" id = "${message.id}">
    <div class="upper-message">
        <div class="upper-message__user-name">
            ${message.name}
        </div>
        <div class="upper-message__date">
            ${message.date}
        </div>
    </div>
    <div class="lower-meesage">
        <p class="lower-message__content">
        ${ message.content }
        </p>
        ${ message.image == null ? "" : '<img src="' + message.image + '">' }
     </div>
  </div>`
    return basehtml;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: "POST", 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
       var html = buildHTML(message);
       $('.messages').append(html)
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
       $('.box').animate({'height' : '200px'});
       $('#new_message')[0].reset();

      })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
    });
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').attr('id');
    group_id = $('.right-header').attr('id')
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: '/groups/'+group_id+'/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !==0) {
        var insertHTML = '';
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('.box').animate({'height' : '200px'});
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        });
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  }
  };

  setInterval(reloadMessages, 10000);
  

});
