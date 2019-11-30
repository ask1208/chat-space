$(function(){
  //var page_url = location.href;  どこのURLを取得できるか確認して
  //console.log(page_url);

  function buildHTML(message){
  var image = (message.image) ?  `<img src=${message.image}>` :'';
    var html = 
  `<div class="message" id = "${message.id}">
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
           ${message.content}
         </p>
       ${image}
      </div>
    </div>`

    return html;
  }
  function aaaaHTML(message){
    console.log(message.content)
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      console.log('OK')
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

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
    console.log(last_message_id);
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
      console.log('success');
      var insertHTML = '';
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.box').animate({'height' : '200px'});
      $.each(messages, function(i, message) {
        console.log(message.content)
        insertHTML += aaaaHTML(message)
      });

      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  }
  };

  // setInterval(reloadMessages, 10000);
  

});
