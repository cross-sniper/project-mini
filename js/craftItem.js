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
