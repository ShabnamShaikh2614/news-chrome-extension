const apiKey = "476a13eba1c55fb7214160718c9b953e";

let category = "general";
let page = 1;

const newsContainer = document.getElementById("newsContainer");
const loadMoreBtn = document.getElementById("loadMore");

// Fetch News
async function fetchNews(reset = false) {

    if (reset) {
        page = 1;
        newsContainer.innerHTML = "";
    }

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&apikey=${apiKey}&page=${page}&max=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data); // Debug

        if (!data.articles || data.articles.length === 0) {
            loadMoreBtn.style.display = "none";
            return;
        }

        loadMoreBtn.style.display = "block";

        data.articles.forEach(article => {

            const image = article.image
                ? article.image
                : "https://via.placeholder.com/400x200";

            const title = article.title || "No Title";
            const desc = article.description || "No description available.";
            const source = article.source?.name || "Unknown";
            const newsUrl = article.url;

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${image}">
                <div class="card-body">
                    <div class="card-title">${title}</div>
                    <div class="source">- ${source}</div>
                    <div class="card-text">${desc}</div>
                    <a href="${newsUrl}" target="_blank" class="btn">Read More</a>
                </div>
            `;

            newsContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        newsContainer.innerHTML = "<p style='color:white;'>Error loading news.</p>";
    }
}

// Category Click
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        category = button.dataset.category;
        fetchNews(true);
    });
});

// Load More
loadMoreBtn.addEventListener("click", () => {
    page++;
    fetchNews();
});
