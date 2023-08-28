// Mine a resource
function mineResource(resourceName) {
    const resourceData = data[resourceName];
    if (resourceData.ore) {
        resources[resourceName] += player.Cpower;
        updateResources();
    } else {
        console.log(`${resourceName} is not mineable.`);
    }
}
