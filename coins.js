document.addEventListener("DOMContentLoaded", function() {
    const coinsContainer = document.getElementById("coins-container");

    // Génération des cartes pour chaque coin réclamable
    for (let i = 1; i <= 5; i++) {
        const coinCard = document.createElement("div");
        coinCard.classList.add("coin-card");
        coinCard.textContent = `Réclamation ${i}`;
        coinCard.onclick = function() {
            alert(`Vous avez réclamé le coin numéro ${i}!`);
        };
        coinsContainer.appendChild(coinCard);
    }
});
