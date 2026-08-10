const playerInput = document.getElementById("playerTag");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

/*
    POUR LES TESTS SUR TON PC :

    Ton backend tourne ici :
    http://127.0.0.1:5000

    PLUS TARD, quand le backend sera hébergé,
    on remplacera cette adresse par l'URL HTTPS.
*/

const API_URL = "http://127.0.0.1:5000";


function cleanTag(tag) {

    tag = tag
        .trim()
        .toUpperCase();

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


    searchButton.disabled = true;

    searchMessage.textContent =
        `🔎 Recherche de ${tag}...`;


    try {

        const url =
            `${API_URL}/api/player/${encodeURIComponent(tag)}`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Joueur introuvable."
            );

        }


        /*
            On sauvegarde le joueur
            pour pouvoir afficher son profil.
        */

        sessionStorage.setItem(
            "rankifyPlayer",
            JSON.stringify(data)
        );


        sessionStorage.setItem(
            "rankifyPlayerTag",
            tag
        );


        /*
            On met aussi le tag dans l'URL.
        */

        window.location.href =
            `player.html?tag=${encodeURIComponent(tag)}`;


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
    function(event) {

        if (event.key === "Enter") {
            searchPlayer();
        }

    }
);


/*
    Bouton d'exemple
*/

document
    .querySelectorAll(".example-tag")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                playerInput.value =
                    button.dataset.tag;

                searchPlayer();

            }
        );

    });
