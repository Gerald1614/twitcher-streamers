var results;
$(document).ready(function(){
  $('body').on('mouseenter', 'tr', function () {
      if ($(this).attr('data-toggle') == 'popover')
      {
          $(this).popover({
              container: 'body',
              placement: 'top',
              trigger: 'hover'
          }).popover('show');
      }
  });

  $("body").on('click', 'tr', function(){
    var toto= $(this).attr('href');
    if(toto !="#"){
       window.open(toto, "_blank");
     }
   });


var listeTwitch =["syndicate", "freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion"];
for (i=0; i<listeTwitch.length; i++){
      $.ajax({
        type: "GET",
        url: "https://wind-bow.gomix.me/twitch-api/channels/"+ listeTwitch[i],
        dataType: "jsonp",
        success: function (data, textStatus, jqXHR) {
            checkStreaming(data);
        },
        error: function (errorMessage) {
        }
    });
  }
  $('.btn-group').on('click', '.btn', function(e) {
    $(this).addClass('active').siblings().removeClass('active');

  if (e.target.className.includes("all")) {
      $(".live").show();
      $(".offline").show();
    }
  else if (e.target.className.includes("streaming")) {
      $(".live").show();
      $(".offline").hide();
    }
  else if (e.target.className.includes("oL")) {
      $(".live").hide();
      $(".offline").show();
    }
  });
});

function checkStreaming(streaming){
  $.ajax({
    type: "GET",
    url: "https://wind-bow.gomix.me/twitch-api/streams/"+ streaming.name,
    dataType: "jsonp",
    success: function (data, textStatus, jqXHR) {
      streaming.stream=data;
        createTable(streaming);
    },
    error: function (errorMessage) {
    }
});
}

function createTable(results){
  var list = document.getElementById("myTabody");
  var u2;
        var y = document.createElement("TR");
          y.setAttribute("data-toggle", "popover");
            list.appendChild(y);
            var t = document.createElement("TD");
            t.setAttribute('class', 'col-xs-3');
            var l = document.createElement("A");
            var u = document.createTextNode(results.name);
            l.setAttribute("href", "https://www.twitch.tv/"+ results.name);
            l.setAttribute("target", "_blank");
            l.appendChild(u);
            t.appendChild(l);
            y.appendChild(t);
            var t2 = document.createElement("TD");
            t2.setAttribute('class', 'col-xs-3');
            var t3 = document.createElement("TD");
            t3.setAttribute('class', 'col-xs-6');
            if (results.stream.stream) {
            u2 = document.createTextNode(results.stream.stream.game);
            t2.appendChild(u2);
            var v2 = document.createElement("img");
            v2.setAttribute("src", results.stream.stream.preview.medium);
            t3.appendChild(v2);
            y.setAttribute("class", "live success");
            y.setAttribute("href", "https://www.twitch.tv/"+ results.name);
            y.setAttribute("data-content", "You can click to get access to live streaming");
            }
            else{
              u2= document.createTextNode("Offline");
              t2.appendChild(u2);
              y.setAttribute("class", "offline danger");
              y.setAttribute("href", "#");
              y.setAttribute("data-content", "this channel is not currently streaming");
            }
            y.appendChild(t2);
            y.appendChild(t3);
            var t3 = document.createElement("TD");

            document.getElementById("myTable").setAttribute("class", "table");
}
