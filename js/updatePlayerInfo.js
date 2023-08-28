// Function to update the displayed player data
function updatePlayerInfo() {
    document.getElementById("cash-value").textContent = player.cash;
    document.getElementById("cpower-value").textContent = player.Cpower;
    document.getElementById("cpower-cost").textContent = player.Ccost;
    document.getElementById("upower-value").textContent = player.Upower;
    document.getElementById("upower-cost").textContent = player.Ucost;
}
