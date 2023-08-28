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
