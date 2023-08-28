function upgrade(thing) {
    if (thing === "Cpower" && player.cash >= player.Ccost) {
        player.Cpower++;
        player.cash -= player.Ccost;
        player.Ccost *= 2;
        console.log(`Upgraded ${thing}. New ${thing}: ${player[thing]}, Cash: ${player.cash}`);
    } else if (thing === "Upower" && player.cash >= player.Ucost) {
        player.Upower++;
        player.cash -= player.Ucost;
        player.Ucost *= 2;
        console.log(`Upgraded ${thing}. New ${thing}: ${player[thing]}, Cash: ${player.cash}`);
    } else {
        console.log(`Insufficient cash to upgrade ${thing}`);
    }
}
