// ==UserScript==
// @name         QuickReply for IWD 0.3.2 
// @version      1
// @description  Replace '/r' by the name of the last character who send you a private message + sound when you get a private message
// @author       Polfy's
// @match        https://play.isleward.com/
//Thxs to qndel : https://github.com/qndel/IslewardAddonBundle/blob/master/quickreply.js
// ==/UserScript== 

addons.register({
    init: function(events) {
        events.on('onGetMessages', this.onGetMessages.bind(this));
    },

    onGetMessages: function(msg) {
        if(msg.messages && msg.messages[0] != undefined && msg.messages[0].type != undefined && msg.messages[0].type == "chat" && msg.messages[0].message != undefined){
            var myReg =   /\((\b[a-zA-Z]*)(\[\d{1,2}\])? to you\): \b.*/g;
            var matched = myReg.exec(msg.messages[0].message);
            if(matched != undefined && matched.length >= 2){
                var audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.burnkit2600.com/temp/HR-16/HR-16-WAVs/49-drum%20sticks.wav";
                audioElement.play();
                window.lastReply = matched[1];
            }
        }
    },
});

var GetLastReply = function(){
    if(jQuery(".el.textbox.message")[0] != undefined && jQuery(".el.textbox.message").val().substring(0, 2) == "/r" && window.lastReply != undefined){
        jQuery(".el.textbox.message").val(jQuery(".el.textbox.message").val().replace("/r", "@"+window.lastReply+" "));
    }
}
setInterval(GetLastReply,100);
