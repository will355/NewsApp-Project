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
            newsContainer.innerHTML = <p>No articles found</p>
        }

    }
    catch (error) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Failed to load news. Please try again later.';
        console.error('Error loading headlines:', error);
    }

    function displayArticles(articles, container) {
        container.innerHTML = ' ';

        articles.forEach(articles => {
            const cards = createsNewCard(articles)
            container.appendChild(cards)
        })

    }
}
