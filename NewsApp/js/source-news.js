
async function loadSourceNews() {

    const articlesContainer = document.getElementById('articles-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const sourceTitleElement = document.getElementById('source-title');
    const sourceDescriptionElement = document.getElementById('source-description');

    const urlParams = new URLSearchParams(window.location.search);
    const sourceId = urlParams.get('source');
    const sourceName = urlParams.get('name');

    //  Check if we have a source ID
    if (!sourceId) {

        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'No source specified. Please select a source from the sources page.';
        return;
    }

    //  Update the page title with the source name
    if (sourceName) {
        sourceTitleElement.textContent = sourceName;
        sourceDescriptionElement.textContent = `Latest articles from ${sourceName}`;
    }

    try {
        //  Fetch articles from this specific source
        const data = await fetchNews(`/top-headlines?sources=${sourceId}`);


        loadingElement.style.display = 'none';

        if (data.articles && data.articles.length > 0) {

            displayArticles(data.articles, articlesContainer);
        } else {

            articlesContainer.innerHTML = '<p>No articles found for this source.</p>';
        }

    } catch (error) {

        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Failed to load articles. Please try again later.';
        console.error('Error loading source news:', error);
    }
}


function displayArticles(articles, container) {

    container.innerHTML = '';


    articles.forEach(article => {
        const card = createNewsCard(article);

        container.appendChild(card);
    });
}


function createNewsCard(article) {

    const card = document.createElement('div');
    card.className = 'news-card';


    const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image';


    const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
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


document.addEventListener('DOMContentLoaded', loadSourceNews);
