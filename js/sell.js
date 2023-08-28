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
