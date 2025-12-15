// Fetch and Display top US headlines

async function loadTopHeadlines() {
    const newsContainer = document.getElementById('news-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    try {
        const data = await fetchNews('/top-headlines?country=us');
        loadingElement.style.display = 'none';

        if (data.articles && data.articles.length > 0) {
            displayArticles(data.articles, newsContainer)
        } else {
            newsContainer.innerHTML = '<p>No articles found</p>'
        }

    }
    catch (error) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Failed to load news. Please try again later.';
        console.error('Error loading headlines:', error);
    }

    function displayArticles(articles, container) {
        container.innerHTML = '';

        articles.forEach(article => {
            const card = createNewCard(article);
            container.appendChild(card);
        });

    }

    function createNewCard(article) {
        const card = document.createElement('div');

        card.className = 'news-card';

        const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image';

        const date = new Date(article.publishedAt).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        card.innerHTML = `
    <img src="${imageUrl}" alt="${article.title}">
    <div class="news-card-content">
        <div class="source">${article.source.name}</div>
        <h3>${article.title}</h3>
        <p class="description">${article.description || 'No description available.'}</p>
        <div class="meta">
            <span class="author">${article.author || 'Unknown'}</span>
            <span class="date">${date}</span>
        </div>
        <a href="${article.url}" target="_blank">Read More →</a>
    </div>
`;

        return card;

    }
}

document.addEventListener('DOMContentLoaded', loadTopHeadlines);
