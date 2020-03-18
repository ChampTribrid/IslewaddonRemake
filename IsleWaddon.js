// TempFix of Windows double load on iwd Client
if (window.stopDoubleLoad != "true") {
    window.stopDoubleLoad = "true";
    // Link to the right GitHub source code
    window.IsleWaddonVersion = "https://gitlab.com/Isleward-Modding/addons/IsleWaddon";
    window.Version = "0.11";
    window.VersionIWD = "3.1.11";

    addons.register({
        init: function(events) {
            events.on('onResourcesLoaded', this.onResourcesLoaded.bind(this));
            events.on('onShowCharacterSelect', this.onShowCharacterSelect.bind(this));
            events.on('onGetPlayer', this.onGetPlayer.bind(this));
        },

        onResourcesLoaded: function() {
            window.gameStarted = "false";
            initIsleWaddon();
        },

        onShowCharacterSelect: function() {
            window.gameStarted = "false";
        },

        onGetPlayer: function() {
            if(window.gameStarted != "true") {
                window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"IsleWaddon v"+window.Version+" loaded for iwd v"+window.VersionIWD+ '</div>').appendTo(jQuery(".uiMessages .list"))});
                if (window.gameStartedOnce != "true") {
                    window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"I can't guarantee this add-on doesn't produce lag/fps drops. Notify me (Polfy#6924) of any bugs/problems on Discord"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
                }
                window.gameStartedOnce = "true";
                window.gameStarted = "true";
            }
        }
    });

    function initIsleWaddon() {
        // GET FEATURES
        window.download = jQuery('<div class="isleWaddon-uiDownload" style="position:absolute;bottom:170px;right:10px;width: 210px;padding: 5px;border: 2px solid gray;background-color: rgba(55, 48, 65, 0.7);text-align: center;"></div>').appendTo(jQuery('.ui-container'));
        var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Downloading.....</font>";
        window.download.html(src);

        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/MenuDisplay.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/RespawnTimer.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/AutoReply.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/QuestHide.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/BetterInventory/QualityBorder.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/BetterInventory/LockItem.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/BetterInventory/EasySalvage.js");
        window.getScript("https://gitlab.com/Isleward-Modding/addons/IsleWaddon/-/blob/master/IsleWaddonFeature/BetterInventory/ToolTipExpand/ToolTipExpand.js");
        
        window.download.html(src);
        setTimeout(function(){src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Loaded for iwd v"+window.VersionIWD+"</font>";window.download.html(src);},200);
        initUserData();
        setTimeout(function(){jQuery(".isleWaddon-uiDownload").remove()},6000);
	    
	    
    }

    // DEFAULT SETTINGS
    window.gameStarted = "false";
    window.MenuSTATUS = "false";
    window.MapSTATUS = "false";
    window.audioElement = document.createElement("audio");
    window.audioElement.type = "audio/wav";
    window.audioElement.volume = 0.2;

    // GET USER DATA
    window.SalvageSTATUS = "false";
    window.TimerSTATUS = "true";
    window.TimerSoundSTATUS = "true";
    window.WhisperSoundSTATUS = "true";
    window.StatsRangeSTATUS = "false";
    window.QuestHideSTATUS = "false";
    window.CombatLogSTATUS = "false";
    window.mapScale = 2;
    window.map_xOffset = 0;
    window.map_yOffset = 0;
	
    window.borderSetting = 0;
    window.borderStyleQ = "solid"
    window.colorQ = "";
    window.borderWidthQ = ["0px","1px","2px","1px","2px","0px","0px"];
    window.borderBottomWidthQ = ["0px","1px","2px","1px","2px","3px","5px"];
    window.borderRadiusQ = ["0px","0px","0px","12px","12px","0px","0px"];
    window.backColor = ["","#5c2338","#5c2338","#5c2338","#5c2338","#5c2338","#5c2338"];
    window.borderEQ = [0,0,0,0,0,1,1];

    function initUserData() {
        var userData = localStorage.getObject('IsleWaddonUserData');
        if(userData != undefined && userData != null){
            window.SalvageSTATUS = userData.SalvageSTATUS;
            window.TimerSTATUS = userData.TimerSTATUS;
            window.TimerSoundSTATUS = userData.TimerSoundSTATUS;
            window.WhisperSoundSTATUS = userData.WhisperSoundSTATUS;
            window.StatsRangeSTATUS = userData.StatsRangeSTATUS;
            window.QuestHideSTATUS = userData.QuestHideSTATUS;
	    if(userData.BorderSetting != undefined && userData.BorderSetting != null){window.borderSetting = userData.BorderSetting;}
            else{window.borderSetting = 0;}
            window.mapScale = userData.mapScale;
            window.map_xOffset = userData.map_xOffset;
            window.map_yOffset = userData.map_yOffset;
            window.CombatLogSTATUS = "false";
        } else {
            // Clean old islewaddon local storage
            localStorage.removeItem('islewardMinimap');
            localStorage.removeItem('isleWaddonSalvage');
            localStorage.removeItem('isleWaddonTimer');
            localStorage.removeItem('isleWaddonTimerSound');
            localStorage.removeItem('isleWaddonWhisperSound');
            localStorage.removeItem('isleWaddonStatsRange');
            localStorage.removeItem('isleWaddonHideQuest');
            localStorage.removeItem('isleWaddonCombatLog');
        }
        window.setUserData();
	    
		// Lock feature //
	userData = localStorage.getObject('IsleWaddonUserDataLockSetting');
        if (userData != undefined && userData != null) {
            window.lockUsersItemsIDs = userData.lockUsersItemsIDs;
        }
        window.setUserLockData();
		// Lock feature //
    }

    window.setUserData = function() {
        localStorage.setObject('IsleWaddonUserData', {/*newtest:newtest,*/SalvageSTATUS:window.SalvageSTATUS, TimerSTATUS:window.TimerSTATUS, TimerSoundSTATUS:window.TimerSoundSTATUS, WhisperSoundSTATUS:window.WhisperSoundSTATUS, StatsRangeSTATUS:window.StatsRangeSTATUS, QuestHideSTATUS:window.QuestHideSTATUS, CombatLogSTATUS:window.CombatLogSTATUS, map_xOffset:window.map_xOffset, map_yOffset:window.map_yOffset, mapScale:window.mapScale, BorderSetting:window.borderSetting});
    }
	
    window.setUserLockData = function () {
	localStorage.setObject('IsleWaddonUserDataLockSetting', {
		lockUsersItemsIDs: window.lockUsersItemsIDs
	});
    }

    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }

    // SEND CHAT MSG FUNCTION
    window.deferTillChat = function(method) {
        if (jQuery(".uiMessages .list")[0] !== undefined) {
            method();
        } else {
            setTimeout(function() { deferTillChat(method) }, 50);
        }
    }
}
