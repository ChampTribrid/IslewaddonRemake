var L1T = "";
var L2T = "";
var L3T = "";
window.respawnTime0 = 0;
window.respawnTime1 = 0;
window.respawnTime2 = 0;

addons.register({
    init: function(events) {
        events.on('onGetObject', this.onGetObject.bind(this));
    },

    onGetObject: function(obj) {
        if(window.TimerSTATUS == "true") {
            if(obj.name == "m'ogresh"){
                window.bossID0 = obj.id;
            }
            if (obj.id == window.bossID0 && obj.destroyed){
                window.respawnTime0 = 1+143;
            }
            if(obj.name == "Stinktooth"){
                window.bossID1 = obj.id;
            }
            if (obj.id == window.bossID1 && obj.destroyed){
                window.respawnTime1 = 1+60;
            }

            if(obj.name == "Steelclaw"){
                window.audioElement.src = "https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/Sound/drum_stick.wav";
                window.audioElement.play();
                window.bossID1_1 = obj.id;
            }
            if (obj.id == window.bossID1_1 && obj.destroyed){
                window.respawnTime1 = 1+60;
            }
            if(obj.name == "Radulos"){
                window.bossID2 = obj.id;
            }
            if (obj.id == window.bossID2 && obj.destroyed){
                window.respawnTime2 = 1+600;
            }
        }
    }
})

window.TimerAddon = function(){
    window.menuTimer = jQuery('<div class="isleWaddon-uiTimer" style="position:absolute;left:632px;top:10px;"></div>').appendTo(jQuery('.ui-container'));
    var src = window.tooltipStyle+'<table bgcolor="#3c3f4c">'
    if (L1T != "") {src += window.tooltipTextStart+L1T+'</span></div></td>';}
    if (L2T != "") {src += window.tooltipTextStart+L2T+'</span></div></td>';}
    if (L3T != "") {src += window.tooltipTextStart+L3T+'</span></div></td>';}
    src += '</table>';
    if (L1T == "" && L2T == "" && L3T == "") {src = "";}
    window.menuTimer.html(src);
}

window.repeatEverySec = function(){
    if(window.respawnTime0 > 0){
        window.respawnTime0--;
        if(window.respawnTime0 == 13 && window.TimerSTATUS == "true" && window.TimerSoundSTATUS == "true"){
            window.audioElement.src = "https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/Sound/cat-meow3.wav";
            window.audioElement.play();
        }
    }

    if(window.respawnTime1 > 0){
        window.respawnTime1--;
        if(window.respawnTime1 == 10 && window.TimerSTATUS == "true" && window.TimerSoundSTATUS == "true"){
            window.audioElement.src = "https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/Sound/clock-tick1.wav";
            window.audioElement.play();
        }
    }

    if(window.respawnTime2 > 0){
        window.respawnTime2--;
        if(window.respawnTime2== 30 && window.TimerSTATUS == "true" && window.TimerSoundSTATUS == "true"){
            window.audioElement.src = "https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/Sound/cricket-3.wav";
            window.audioElement.play();
        }
    }
    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10);
        var hours = Math.floor(sec_num / 3600) % 24;
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }
    if(window.respawnTime1 != 0 && window.TimerSTATUS == "true"){
        L1T = "Stinktooth respawns in "+ toHHMMSS(window.respawnTime1-1);
        jQuery(".isleWaddon-uiTimer").remove();
        window.TimerAddon();
    }
    if(window.respawnTime2 != 0 && window.TimerSTATUS == "true"){
        L2T = "Radulos respawns in "+ toHHMMSS(window.respawnTime2-1);
        jQuery(".isleWaddon-uiTimer").remove();
        window.TimerAddon();
    }
    if(window.respawnTime0 != 0 && window.TimerSTATUS == "true"){
        L3T = "M'ogresh respawns in "+ toHHMMSS(window.respawnTime0-1);
        jQuery(".isleWaddon-uiTimer").remove();
        window.TimerAddon();
    }
    if(window.respawnTime1 == 1){
        L1T = "";
        jQuery(".isleWaddon-uiTimer").remove();
        window.TimerAddon();
    }
    if(window.respawnTime2 == 1){
        L2T = "";
        jQuery(".isleWaddon-uiTimer").remove();
        window.TimerAddon();
    }
    if(window.respawnTime0 == 1){
        L3T = "";
        jQuery(".isleWaddon-uiTimer").remove();
        window.TimerAddon();
    }
    if(window.respawnTime0 == 1 && window.respawnTime1 == 1 && window.respawnTime2 == 1){
        jQuery(".isleWaddon-uiTimer").remove();
    }
};
setInterval(window.repeatEverySec, 1000);
