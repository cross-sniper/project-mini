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
