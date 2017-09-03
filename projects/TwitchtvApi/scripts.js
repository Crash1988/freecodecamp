 $(function() {
     $('input[name="toggle_option"]').on('change', function(a, b) {
         var value = this.value;
         if (value == 'All') {
             $('.online').show();
             $('.offline').show();

         }
         if (value == 'Online') {
             $('.online').show();
             $('.offline').hide();
         }
         if (value == 'Offline') {
             $('.online').hide();
             $('.offline').show();
         }
     });
     getChannelInfo();
 });


 var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

 function getChannelInfo() {
     channels.forEach(function(channel) {
         function makeURL(type, name) {
             return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
         };
         $.getJSON(makeURL("streams", channel), function(data) {
             var game,
                 status;
             if (data.stream === null) {
                 game = "Offline";
                 status = "offline";
             } else if (data.stream === undefined) {
                 game = "Account Closed";
                 status = "offline";
             } else {
                 game = data.stream.game;
                 status = "online";
             };
             $.getJSON(makeURL("channels", channel), function(data) {
                 var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
                     name = data.display_name != null ? data.display_name : channel,
                     description = status === "online" ? ': ' + data.status : "";
                 /*html = '<div class="row ' +
                     status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
                     logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
                     data.url + '" target="_blank"   "style=\"display: block !important;\">' +
                     name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">' +
                     game + '<span class="hidden-xs">' +
                     description + '</span></div></div>';*/
                 html = '<div class="row ' +
                     status + '"><a href="' + data.url + '" target="_blank"   "style=\"display: block !important;\">' + name + '<div class="col-xs-2 col-sm-1" id="icon"><img src="' +
                     logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name">' +

                     '</div><div class="col-xs-10 col-sm-8" id="streaming">' +
                     game + '<span class="hidden-xs">' +
                     description + '</span></div>' + '</a>' + '</div>';
                 status === "online" ? $("#display").prepend(html) : $("#display").append(html);
             });
         });
     });
 }; 