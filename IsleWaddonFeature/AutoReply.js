addons.register({
    init: function(events) {
        events.on('onGetMessages', this.onGetMessages.bind(this));
    },

    onGetMessages: function(msg) {
        if(msg.messages && msg.messages[0] != undefined && msg.messages[0].type != undefined && msg.messages[0].type == "chat" && msg.messages[0].message != undefined){
            var myReg =   /\((\b[a-zA-Z]*)(\[\d{1,2}\])? to you\): \b.*/g;
            var matched = myReg.exec(msg.messages[0].message);
            if(matched != undefined && matched.length >= 2){
                if(window.WhisperSoundSTATUS === "true") {
                    window.audioElement.src = "https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/Sound/drum_stick.wav";
                    window.audioElement.play();
                }
                window.lastReply = matched[1];
            }
        }
    }
})

var chatCheck = function(){
    if(window.gameStarted == "true") {
        if(jQuery(".el.textbox.message")[0] != undefined && jQuery(".el.textbox.message").val().substring(0, 2) == "/r" && window.lastReply != undefined){
        jQuery(".el.textbox.message").val(jQuery(".el.textbox.message").val().replace("/r", "@"+window.lastReply+" "));
        jQuery(".uiMessages .list").scrollTop(9999999);
        }
        if(jQuery(".el.textbox.message")[0] != undefined && jQuery(".el.textbox.message").val().substring(0, 2) == "/w"){
        jQuery(".el.textbox.message").val(jQuery(".el.textbox.message").val().replace("/w", "@"));
        jQuery(".uiMessages .list").scrollTop(9999999);
        }
    }
}
setInterval(chatCheck,100);
