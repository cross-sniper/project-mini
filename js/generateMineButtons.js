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
