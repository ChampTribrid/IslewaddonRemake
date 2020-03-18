window.lockUsersItemsIDs = {};
window.currentUserName = null;
window.lockHotKey = "b";
const dataName = ["level", "quality", "slot", "type", "sprite", "stats", "implicitStats", "name", "worth", "ability", "spell"];

addons.register({
	init: function (events) {
		events.on('onContextMenu', this.onContextMenu.bind(this));
		events.on('onGetPlayer', this.onGetPlayer.bind(this));
		events.on('onKeyDown', this.onKeyDown.bind(this));
		events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
		events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
	},
	
	onGetPlayer: function (playerData) {
		window.currentUserName = playerData.name;
		window.lockUsersItemsIDs[window.currentUserName] = window.lockUsersItemsIDs[window.currentUserName] || {};
	},
	onShowItemTooltip: function (obj) {
		item = saveData(obj);
	},
	onHideItemTooltip: function () {
		item = -1;
	},
	onKeyDown: function (key) {
		if (!key) {
			return;
		}
		if (key === window.lockHotKey)
			if (item.level != undefined) {
				index = checkIfSaved(item);
				if (window.lockUsersItemsIDs[window.currentUserName][index] !== undefined && window.lockUsersItemsIDs[window.currentUserName][index]["lock"] === true) {
					settingLockOff(item, index);
				}
				else {
					settingLockOn(item, index);
				}
			}
	},
	onContextMenu: function () {
		menuOptions(item);
	}
});

function settingLockOn(itemData, index) {
	itemData["lock"] = true;
	window.lockUsersItemsIDs[window.currentUserName] = {
		...window.lockUsersItemsIDs[window.currentUserName],
		[index]: itemData
	};
}

function settingLockOff(itemData, index) {
	itemData["lock"] = false
	window.lockUsersItemsIDs[window.currentUserName] = {
		...window.lockUsersItemsIDs[window.currentUserName],
		[index]: itemData
	};

	if (Object.keys(window.lockUsersItemsIDs[window.currentUserName]).length > 10) {
		newObj = {};
		for (let i = 0; i < Object.keys(window.lockUsersItemsIDs[window.currentUserName]).length; i++) {
			if (window.lockUsersItemsIDs[window.currentUserName][i]["lock"] === true) {
				newObj[Object.keys(newObj).length] = window.lockUsersItemsIDs[window.currentUserName][i];
			}
		}
		window.lockUsersItemsIDs[window.currentUserName] = newObj;
	}
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
		
		if (window.lockUsersItemsIDs[window.currentUserName][index] !== undefined && window.lockUsersItemsIDs[window.currentUserName][index]['lock']) {
			const contextMenu = contextMenuOptions.querySelectorAll(".option");
			const texts = ["drop", "salvage", "destroy", "mail", "stash", "----------"];
			for (const menuItem of contextMenu) {
				const { innerText } = menuItem;
				if (texts.some(txt => txt === innerText.trim())) {
					menuItem.remove();
				}
			}
			settingLockOn(itemData, index);
			newOption.innerText = "unlock";
			newOption.addEventListener('click', settingLockOff.bind(this, itemData, index));
		}
		else {
			settingLockOff(itemData, index);
			newOption.innerText = "lock";
			newOption.addEventListener('click', settingLockOn.bind(this, itemData, index));
		}
		contextMenuOptions.append(newNoHover);
		contextMenuOptions.append(newOption);
	});
}

function checkIfSaved(itemData) {
	for (let [key, savedData] of Object.entries(window.lockUsersItemsIDs[window.currentUserName])) {
		if (itemDataCheck(itemData, savedData)) {
			return key;
		}
	}
	index = Object.entries(window.lockUsersItemsIDs[window.currentUserName]).length;
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
		if (Object.keys(itemToCheck).includes(key1))
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
	return true;
}

function showLocked() {
	if (window.currentUserName) {
		if ($(".ui-container .uiInventory").css("display") == "block") {
			items = $('.uiInventory .grid .item');
			for (let key in items) {
				itemData = items.eq(key).data('item');
				if (itemData != undefined && itemData.level !== undefined) {
					index = checkIfSaved(itemData);
					if (window.lockUsersItemsIDs[window.currentUserName][index] !== undefined && window.lockUsersItemsIDs[window.currentUserName][index]["lock"] === true) {
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
setInterval(showLocked, 10);
