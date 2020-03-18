// ==UserScript==
// @name         AllTimer for IWD 0.3.2
// @version      1
// @description  in-game Timer
// @author       Polfy's
// @match        https://play.isleward.com/
// Thxs to qndel : https://github.com/qndel/IslewardAddonBundle/blob/master/respawntimer.js
// ==/UserScript==

var audioElement;
var mogId;
var stinkId;
var steelId;
var radId;
var timerMog = 0;
var timerStink = 0;
var timerRad = 0;

addons.register({
    init: function(events) {
        events.on('onGetObject', this.onGetObject.bind(this));
        events.on('onGetMap', this.onGetObject.bind(this));

        this.uiContainer = $('.ui-container');
		this.uiDisplayMogresh = $('<div id = "DisplayMogresh" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiDisplayStinktooth = $('<div id = "DisplayStinktooth" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiDisplayRadulos = $('<div id = "DisplayRadulos" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);

		this.uiDisplayMogresh.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 25) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
		this.uiDisplayStinktooth.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 15.4) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
		this.uiDisplayRadulos.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 11) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
    },
    onGetObject: function(obj) {
        if(obj.name === "m'ogresh"){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/027/beat_jug.wav";
            audioElement.play();
            mogId = obj.id;
            timerMog = 0;
        }
        if (typeof mogId != "undefined" && obj.id == mogId && obj.destroyed){
            if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                window.lastKilled = new Date();
            }
            timerMog = 141;
        }
        if(obj.name === "Stinktooth"){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/027/beat_jug.wav";
            audioElement.play();
            stinkId = obj.id;
            timerStink = 0;
        }
        if (typeof stinkId != "undefined" && obj.id == stinkId && obj.destroyed){
            if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                window.lastKilled = new Date();
            }
            timerStink = 60;
        }
        if(obj.name === "Steelclaw"){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/027/drum_stick.wav";
            audioElement.play();
            steelId = obj.id;
            timerStink = 0;
        }
        if (typeof steelId != "undefined" && obj.id == steelId && obj.destroyed){
            if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                window.lastKilled = new Date();
            }
            timerStink = 60;
        }
        if(obj.name === "Radulos"){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/027/beat_jug.wav";
            audioElement.play();
            radId = obj.id;
            timerRad = 0;
        }
        if (typeof radId != "undefined" && obj.id == radId && obj.destroyed){
            if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                window.lastKilled = new Date();
            }
            timerRad = 600;
        }
    }
});

var repeatEverySec = function(){
    if(typeof timerMog === "undefined"){
        timerMog = 0;
    }
    if(typeof timerStink === "undefined"){
        timerStink = 0;
    }
    if(typeof timerRad === "undefined"){
        timerRad = 0;
    }

    if(timerMog > 0){
        timerMog--;
        if(timerMog == 14){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/002/cat-meow3.wav";
            audioElement.play();
        }
    }
    if(timerStink > 0){
        timerStink--;
        if(timerStink == 4){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/020/clock-tick1.wav";
            audioElement.play();
        }
    }
    if(timerRad > 0){
        timerRad--;
        if(timerRad== 10){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/014/cricket-3.wav";
            audioElement.play();
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
    if(timerStink != 0){
        document.getElementById('DisplayStinktooth').textContent = "Stinktooth respawns in "+ toHHMMSS(timerStink);
    }
    if(timerRad != 0){
        document.getElementById('DisplayRadulos').textContent = "Radulos respawns in "+ toHHMMSS(timerRad);
    }
    if(timerMog != 0){
        document.getElementById('DisplayMogresh').textContent = "M'ogresh respawns in "+ toHHMMSS(timerMog);
    }

    if(timerStink == 0){
        document.getElementById('DisplayStinktooth').textContent = "";
    }
    if(timerRad == 0){
        document.getElementById('DisplayRadulos').textContent = "";
    }
    if(timerMog == 0){
        document.getElementById('DisplayMogresh').textContent = "";
    }
};
setInterval(repeatEverySec, 1000);
