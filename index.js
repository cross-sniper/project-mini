data = {"iron": {"name": "iron", "desc": "A refined iron ingot, ready for crafting.", "value": 25, "time": 4, "ore": false, "heat": true, "heatNum": 1.0, "makes": [], "needs": ["ironOre"]}, "ironOre": {"name": "Iron Ore", "desc": "Raw iron ore extracted from mines.", "value": 5, "time": 3, "ore": true, "heat": false, "makes": ["iron"], "needs": []}, "copperOre": {"name": "copper ore", "desc": "copper ore", "value": 10, "ore": true, "time": 2, "heat": true, "heatNum": 0.5, "makes": ["copper"], "needs": []}, "goldOre": {"name": "gold ore", "desc": "raw gold ore, ready for refining.", "value": 15, "time": 3, "ore": true, "heat": false, "makes": ["gold"], "needs": []}, "glass": {"name": "glass", "desc": "transparent material made from melted sand.", "value": 8, "time": 2, "ore": false, "heat": true, "heatNum": 0.7, "makes": [], "needs": ["sand"]}, "sand": {"name": "sand", "desc": "grains of sand, suitable for glassmaking.", "value": 3, "time": 1, "ore": true, "heat": false, "makes": ["glass"], "needs": []}, "diamond": {"name": "diamond", "desc": "precious gemstone, sparkling and rare.", "value": 200, "time": 10, "ore": false, "heat": false, "heatNum": 0, "makes": [], "needs": ["diamondOre"]}, "water": {"name": "water", "desc": "water, can be used to cool down things", "value": 5, "time": 0.5, "ore": true, "heat": true, "heatNum": -2, "makes": [], "needs": []}, "diamondOre": {"name": "diamond ore", "desc": "rough diamond ore, ready for extraction.", "value": 50, "time": 8, "ore": true, "heat": false, "makes": ["diamond"], "needs": []}, "rubber": {"name": "rubber", "desc": "elastic material derived from rubber plants.", "value": 12, "time": 3, "ore": false, "heat": false, "heatNum": 0, "makes": [], "needs": ["rubberPlant"]}, "rubberPlant": {"name": "rubberPlant", "desc": "plant that yields rubber sap.", "value": 7, "time": 4, "ore": false, "heat": false, "heatNum": 0, "makes": ["rubber"], "needs": ["water"]}, "copper": {"name": "copper", "desc": "shiny copper", "value": 15, "time": 5, "ore": false, "heat": false, "heatNum": 0, "makes": ["wire"], "needs": ["copperOre"]}, "wire": {"name": "wire", "desc": "electric wire", "value": 20, "time": 2, "ore": false, "heat": false, "heatNum": 0, "makes": [], "needs": ["copper"]}, "steel": {"name": "steel", "desc": "A sturdy alloy of iron and carbon.", "value": 25, "time": 4, "ore": false, "heat": true, "heatNum": 1.5, "makes": [], "needs": ["iron", "coal"]}, "coal": {"name": "Coal", "desc": "Fossil fuel used as a heat source.", "value": 6, "time": 1, "ore": true, "heat": true, "heatNum": 0.8, "makes": ["steel"], "needs": []}}
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

function sell(res) {
    const resourceAmount = resources[res];
    const itemData = data[res];
    if (resourceAmount > 0) {
        const value = itemData.value * resourceAmount;
        player.cash += value;
        resources[res] = 0;
        console.log(`Sold ${resourceAmount} ${res} for $${value}. Total Cash: $${player.cash}`);
    }
}

// Complete crafting an item
function completeCrafting(itemName) {
    try {
        const itemData = data[itemName];
        //console.log(itemData)
        if (!itemData) {
            throw new Error(`Item data for "${itemName}" is undefined.`);
        }

        resources[itemName] += player.Upower;
    } catch (error) {
        console.error(error);
        // You might want to log the error instead of showing an alert
        // alert(error.message);
    }
}

// Update crafting queue display
function updateCraftingQueue() {
    const craftingList = document.getElementById("crafting-list");
    craftingList.innerHTML = "";

    for (const item of craftingQueue) {
        const li = document.createElement("li");
        li.textContent = `Crafting ${item.name} (${item.remainingTime.toFixed(1)}s)`;
        craftingList.appendChild(li);
    }
}

// Process crafting queue
function processCraftingQueue() {
    for (let i = craftingQueue.length - 1; i >= 0; i--) {
        const item = craftingQueue[i];
        item.remainingTime -= 0.1;

        if (item.remainingTime <= 0) {
            completeCrafting(item.name);
            craftingQueue.splice(i, 1);
        }
    }
    updateCraftingQueue();
    updateResources();
}

function upgrade(thing) {
    if (thing === "Cpower" && player.cash >= player.Ccost) {
        player.Cpower++;
        player.cash -= player.Ccost;
        player.Ccost *= 2;
        console.log(`Upgraded ${thing}. New ${thing}: ${player[thing]}, Cash: ${player.cash}`);
    } else if (thing === "Upower" && player.cash >= player.Ucost) {
        player.Upower++;
        player.cash -= player.Ucost;
        player.Ucost *= 2;
        console.log(`Upgraded ${thing}. New ${thing}: ${player[thing]}, Cash: ${player.cash}`);
    } else {
        console.log(`Insufficient cash to upgrade ${thing}`);
    }
}

function melt() {
  //this is supposed to call the craftItem function, on every item in the resources thing
}

// Generate mine buttons for each mineable resource
function generateMineButtons() {
    const mineButtonsDiv = document.getElementById("mine-buttons");

    for (const resourceName in data) {
        const resourceData = data[resourceName];
        if (resourceData.ore) {
            const button = document.createElement("button");
            button.textContent = `Mine ${resourceData.name}`;
            button.addEventListener("click", () => mineResource(resourceName));
            mineButtonsDiv.appendChild(button);
        }
    }
}

// Generate buttons for non-minable items
function generateRefiningButtons() {
    const refiningDiv = document.getElementById("refining-buttons");

    for (const resourceName in data) {
        const resourceData = data[resourceName];
        if (!resourceData.ore) {
            const button = document.createElement("button");
            button.textContent = `refine ${resourceData.name}`;
            button.addEventListener("click", () => craftItem(resourceName));
            refiningDiv.appendChild(button);
        }
    }
}

// Update displayed resources
function updateResources() {
    const resourcesList = document.getElementById("resources-list");
    resourcesList.innerHTML = "";

    for (const resourceName in resources) {
        const resourceAmount = resources[resourceName];
        const resourceData = data[resourceName];

        const li = document.createElement("div");
        li.innerHTML = `
    <li>${resourceData.name}: ${resourceAmount}</li>
    ${resourceData.desc}`;
        resourcesList.appendChild(li);
    }
}

function sellAll() {
    for (const resourceName in resources) {
        for (const itemName in data) {
            const resourceAmount = resources[resourceName];
            const itemData = data[itemName];
            if (itemData.name === resourceName && resourceAmount > 0) {
                const value = itemData.value * resourceAmount;
                player.cash += value;
                resources[resourceName] = 0;
                console.log(`Sold ${resourceAmount} ${resourceName} for $${value}. Total Cash: $${player.cash}`);
            }
        }
    }
}

// Function to update the displayed player data
function updatePlayerInfo() {
    document.getElementById("cash-value").textContent = player.cash;
    document.getElementById("cpower-value").textContent = player.Cpower;
    document.getElementById("cpower-cost").textContent = player.Ccost;
    document.getElementById("upower-value").textContent = player.Upower;
    document.getElementById("upower-cost").textContent = player.Ucost;
}

// Check if an item can be crafted
function canCraftItem(itemName) {
    const itemData = data[itemName];
    for (const requiredResource of itemData.needs) {
        if (resources[requiredResource] <= 0) {
            return false;
        }
    }
    return true;
}

// Mine a resource
function mineResource(resourceName) {
    const resourceData = data[resourceName];
    if (resourceData.ore) {
        resources[resourceName] += player.Cpower;
        updateResources();
    } else {
        console.log(`${resourceName} is not mineable.`);
    }
}

// Craft an item
function craftItem(itemName) {
    const itemData = data[itemName];
    if (canCraftItem(itemName)) {
        craftingQueue.push({
            name: itemData.name,
            remainingTime: itemData.time
        });
        for (const requiredResource of itemData.needs) {
            resources[requiredResource]--; //moved this here, so it avoids the issue of going negative
        }
        updateCraftingQueue();
    }
}




// Initialize game loop and display initial resources
setInterval(processCraftingQueue, 100);
updatePlayerInfo()
setInterval(updatePlayerInfo,100)
updateResources();
generateMineButtons();
generateRefiningButtons()
document.title = "project mini"