// For Soul's Moor 2019

addons.register({
    init: function(events) {
        events.on('onGetPlayer', this.onGetPlayer.bind(this));
        events.on('onGetObject', this.onGetObject.bind(this));
    },

    onGetPlayer: function() {
        window.getNextSpawn();
    },
    
    onGetObject: function(obj) {
        if (window.TimerSoundSTATUS == "true" && obj.name == "Lord Squash")
        {
            window.audioElement.src = "https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/Sound/battle-music.wav";
            window.audioElement.play();
        }
    }
});

window.getNextSpawn = function(){
    window.bossWait = 600;
    window.bossSpawn = 0;
    $(".ui-container .right .uiEvents .heading").text("Events   🎃");
    window.date = new Date();
    window.dateHours = window.date.getUTCHours();
    window.dateMinutes = window.date.getUTCMinutes();
    window.dateSeconds = window.date.getUTCSeconds();

    if (window.dateHours == 0 || window.dateHours == 4 || window.dateHours == 8 || window.dateHours == 12 || window.dateHours == 16 || window.dateHours == 20 || window.dateHours == 20 ) {
        if (window.dateMinutes == 0 || window.dateMinutes == 1 || window.dateMinutes == 2 || window.dateMinutes == 3 || window.dateMinutes == 4 || window.dateMinutes == 5 || window.dateMinutes == 6 || window.dateMinutes == 7 || window.dateMinutes == 8 || window.dateMinutes == 9 ) {
            window.dateSeconds = 2;
            window.bossWait = 600 - window.dateMinutes * 60 - window.dateSeconds;
        } else {
            window.getTimeForSquash();
        }
    } else {
        window.getTimeForSquash();
    }
};

window.getTimeForSquash = function(){
    window.dateHours = window.dateHours / 4;
    window.dateHours = window.dateHours - Math.floor(window.dateHours);

    window.dateSeconds = 240 * 60 - window.dateHours * 4 * 3600 - window.dateMinutes * 60 - window.dateSeconds;
}

window.repeatEverySecHalloween = function(){
    if(window.dateSeconds > 0){
        window.dateSeconds--;
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
    if(window.dateSeconds != 0){
        $(".ui-container .right .uiEvents .heading").text("Events   🎃 " + toHHMMSS(window.dateSeconds + 600));
    }
    if(window.dateSeconds == 0){
        if(window.bossWait > 0){
            window.bossWait--;
        }
        if(window.bossWait != 0){
            $(".ui-container .right .uiEvents .heading").text("Events   🎃 Squash in " + toHHMMSS(window.bossWait));
        }
        if(window.bossWait == 0 && window.bossSpawn != 1){
            window.bossSpawn = 1;
            $(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},1000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},1500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},2000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},2500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},3000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},3500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},4000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},4500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},5000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},5500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},6000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},6500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},7000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},7500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},8000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},8500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},9000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},9500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},10000);
            setTimeout(function(){window.getNextSpawn();},50000);
        }
    }
};
setInterval(window.repeatEverySecHalloween, 1000);
