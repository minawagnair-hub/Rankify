const playerInput = document.getElementById("playerTag");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

function cleanTag(tag) {
    return tag
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "");
}

function isValidTag(tag) {
    return /^#[A-Z0-9]{5,15}$/.test(tag);
}

function searchPlayer() {
    const tag = cleanTag(playerInput.value);

    searchMessage.textContent = "";

    if (!tag) {
        searchMessage.textContent =
            "⚠️ Entre un Player Tag.";
        return;
    }

    if (!tag.startsWith("#")) {
        searchMessage.textContent =
            "⚠️ Le Player Tag doit commencer par #.";
        return;
    }

    if (!isValidTag(tag)) {
        searchMessage.textContent =
            "⚠️ Player Tag invalide.";
        return;
    }

    searchMessage.textContent =
        "🔎 Recherche du joueur...";

    /*
     * Pour l'instant, cette partie est une démonstration.
     *
     * IMPORTANT :
     * La clé API Brawl Stars ne doit PAS être placée ici.
     *
     * Plus tard :
     *
     * Site → Backend Rankify → API Brawl Stars
     */

    setTimeout(() => {

        searchMessage.textContent =
            "✅ Player Tag accepté !";

        const encodedTag =
            encodeURIComponent(tag.substring(1));

        /*
         * Page profil temporaire.
         */

        window.location.href =
            `player.html?tag=${encodedTag}`;

    }, 700);
}

searchButton.addEventListener(
    "click",
    searchPlayer
);

playerInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchPlayer();
        }

    }
);


/*
 * Exemple de Player Tag
 */

const exampleButtons =
    document.querySelectorAll(".example-tag");

exampleButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            playerInput.value =
                button.dataset.tag;

            searchPlayer();

        }
    );

});
