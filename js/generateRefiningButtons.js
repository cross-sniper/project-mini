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
