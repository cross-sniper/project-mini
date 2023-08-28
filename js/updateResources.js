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
