data = [[data]]
const resources = {};
// Initialize resources with default values
for (const resourceName in data) {
  resources[resourceName] = 0;
}
const player = {
    Cpower: 1,
    Ccost: 200,
    Upower: 1,
    Ucost: 200,
    cash: 0
  };
const craftingQueue = [];

[[code]]



// Initialize game loop and display initial resources
setInterval(processCraftingQueue, 100);
updatePlayerInfo()
setInterval(updatePlayerInfo,100)
updateResources();
generateMineButtons();
generateRefiningButtons()