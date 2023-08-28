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
