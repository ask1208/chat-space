$(function(){
  function buildHTML(message){
　var image = (message.image) ?  `<img src=${message.image}>` :'';
    var html = 
  `<div class="message">
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
    });
  })
});