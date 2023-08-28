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
