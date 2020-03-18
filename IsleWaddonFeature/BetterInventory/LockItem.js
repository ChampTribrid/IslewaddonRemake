const dataName = ["level", "quality", "slot", "stats", "implicitStats", "name", "ability", "spell", "id"];
window.currentUserName = null;

addons.register({
    init: function (events) {
        events.on('onContextMenu', this.onContextMenu.bind(this));
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
        events.on('onGetPlayer', this.onGetPlayer.bind(this));
        events.on('onDestroyItems', this.onDestroyItems.bind(this));
        events.on('onGetItems', this.onGetItems.bind(this));
        events.on('onKeyDown', this.onKeyDown.bind(this));
    },

    onShowItemTooltip: function (obj) {
        item = saveData(obj);
    },

    onHideItemTooltip: function () {
        item = -1;
    },

    onContextMenu: function () {
        if (jQuery(".ui-container .uiInventory").css("display") == "block") {
            menuOptions(item);
        }
    },

    onGetPlayer: function (playerData) {
        setTimeout(() => {
            document.querySelector(".grid").addEventListener("mouseup", inventoryCall.bind(this));
            document.querySelector(".btnInventory").addEventListener("click", inventoryCall.bind(this));
            document.querySelector(".uiSmithing .bottom .col .content.item-picker").addEventListener("click", inventoryCall.bind(this))
        }, 1000)
        window.currentUserName = playerData.name;
        lockUsersItemsIDs[currentUserName] = lockUsersItemsIDs[currentUserName] || {};
    },

    onGetItems: function (obj) {
        inventoryCall(obj);
    },

    onKeyDown: function (key) {
        if (!key) {
            return;
        }

        else if (key === "i") {
            inventoryCall();
        }
        
        else if (key === "b") {
            if (item.level != undefined) {
                index = checkIfSaved(item);
                if (lockUsersItemsIDs[currentUserName][index] !== undefined) {
                    settingLockOff(item, index);
                }
                else {
                    settingLockOn(item, index);
                }
                inventoryCall();
            }
        }
    },
    onDestroyItems: function () {
        inventoryCall();
    }

});

function settingLockOn(itemData, index) {
    itemData["lock"] = true;
    lockUsersItemsIDs[currentUserName] = {
        ...lockUsersItemsIDs[currentUserName],
        [index]: itemData
    };
    window.setUserLockData();
}

function settingLockOff(itemData, index) {
    userItems = lockUsersItemsIDs[currentUserName];
    if (userItems[index] !== undefined) {
        userItems[index] = userItems[Object.entries(userItems).length - 1];
        delete userItems[Object.entries(userItems).length - 1];
    }
    window.setUserLockData();
}

function menuOptions(itemData) {
    setTimeout(() => {
        if (!itemData.level) { return; }
        if ($(".uiStash").css("display") == "block") { return; }
        const contextMenuOptions = document.querySelector(".uiContext .list");

        const newOption = document.createElement("div");
        const newNoHover = document.createElement("div");

        newOption.setAttribute("class", "option");
        newNoHover.setAttribute("class", "option no-hover");
        newNoHover.innerText = "----------";
        index = checkIfSaved(itemData);
        if (lockUsersItemsIDs[currentUserName][index] !== undefined && lockUsersItemsIDs[currentUserName][index]['lock']) {

            const contextMenu = contextMenuOptions.querySelectorAll(".option");
            const texts = ["drop", "salvage", "destroy", "mail", "stash"];
            for (const menuItem of contextMenu) {
                const { innerText } = menuItem;
                if (texts.some(txt => txt === innerText.trim())) {
                    menuItem.remove();
                }
            }

            settingLockOn(itemData, index);
            if (itemData.ability) { contextMenuOptions.append(newNoHover); }
            newOption.innerText = "unlock";
            newOption.addEventListener('click', settingLockOff.bind(this, itemData, index));
        }
        else {
            settingLockOff(itemData, index);
            contextMenuOptions.append(newNoHover);
            newOption.innerText = "lock";
            newOption.addEventListener('click', settingLockOn.bind(this, itemData, index))
        }
        newOption.addEventListener('click', inventoryCall.bind(this));
        contextMenuOptions.append(newOption);

    });
}

function checkIfSaved(itemData) {
    if (Object.entries(lockUsersItemsIDs[currentUserName]).length > 0) {
        for (let [key, savedData] of Object.entries(lockUsersItemsIDs[currentUserName])) {
            if (savedData !== undefined && itemDataCheck(itemData, savedData)) {
                return key;
            }
        }
    }
    index = Object.entries(lockUsersItemsIDs[currentUserName]).length;

    return index;
}

function saveData(itemData) {
    obj = {};
    for (let [key, value] of Object.entries(itemData)) {
        if (dataName.includes(key)) {
            obj[key] = value;
        }
    }
    return obj;
}

function itemDataCheck(itemToCheck, savedData) {
    for (let [key1, value1] of Object.entries(savedData)) {
        if (Object.keys(itemToCheck).includes(key1) && key1 !== "id")
            if (typeof value1 === "object" && value1 !== null) {
                for (let [key2, value2] of Object.entries(value1)) {
                    if (key2 != "random" && typeof value2 === "object" && value2 !== null) {
                        for (let [key3,] of Object.entries(value2)) {
                            if (itemToCheck[key1][key2][key3] !== savedData[key1][key2][key3]) { return false; }
                        }
                    }
                    else if (key2 != "random" && itemToCheck[key1][key2] !== savedData[key1][key2]) { return false; }
                }
            }
            else {
                if (itemToCheck[key1] !== savedData[key1]) { return false; }
            }
    }
    return true
}

window.showLocked = function () {
    if (currentUserName) {
        if ($(".ui-container .uiInventory").css("display") == "block") {
            items = $('.uiInventory .grid .item');
            for (let key in items) {
                itemData = items.eq(key).data('item');
                if (itemData != undefined && itemData.level !== undefined) {
                    index = checkIfSaved(itemData);
                    if (lockUsersItemsIDs[currentUserName][index] !== undefined) {
                        items.eq(key).children(".quantity").text("locked");
                    }
                    else if (items.eq(key).find(".quantity").html() !== "NEW") {
                        items.eq(key).children(".quantity").text("");
                    }
                }
            }
        }
    }
}

function inventoryCall(obj) {
    setTimeout(() => {
        window.showLocked();
    })
}
