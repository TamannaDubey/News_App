// ────────────── CONFIGURATION ──────────────
const API_KEY = "f4a200e5dbd64c1e879a29e050f3610b";
const url = "https://newsapi.org/v2/everything?q=";

// ────────────── INITIAL LOAD ──────────────
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// ────────────── FETCH NEWS FUNCTION ──────────────
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

// ────────────── BIND NEWS DATA TO CARDS ──────────────
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// ────────────── FILL INDIVIDUAL CARD ──────────────
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// ────────────── NAVIGATION LOGIC ──────────────
let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");

    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// ────────────── SEARCH FEATURE ──────────────
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (!query) return;

    fetchNews(query);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


