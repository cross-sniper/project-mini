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
