const playerInput = document.getElementById("playerTag");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

// Pour le moment, backend local
const API_URL = "http://127.0.0.1:5000";

function cleanTag(tag) {
    tag = tag.trim().toUpperCase();

    if (!tag.startsWith("#")) {
        tag = "#" + tag;
    }

    return tag;
}

async function searchPlayer() {

    const tag = cleanTag(playerInput.value);

    if (tag.length < 6) {
        searchMessage.textContent =
            "⚠️ Entre un Player Tag valide.";
        return;
    }

    searchMessage.textContent =
        "🔎 Recherche de " + tag + "...";

    searchButton.disabled = true;

    try {

        const response = await fetch(
            `${API_URL}/api/player/${encodeURIComponent(tag)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Joueur introuvable."
            );
        }

        // Sauvegarde du joueur
        sessionStorage.setItem(
            "rankifyPlayer",
            JSON.stringify(data)
        );

        // Sauvegarde également du tag
        sessionStorage.setItem(
            "rankifyPlayerTag",
            tag
        );

        // Aller vers le profil
        window.location.href =
            "player.html";

    } catch (error) {

        console.error(error);

        searchMessage.textContent =
            "❌ " + error.message;

    } finally {

        searchButton.disabled = false;

    }
}

searchButton.addEventListener(
    "click",
    searchPlayer
);

playerInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            searchPlayer();
        }

    }
);
