async function loadSources() {
    const sourceContainer = document.getElementById('sources-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    try {
        // use the correct endpoint for sources
        const data = await fetchNews('/sources?');
        if (loadingElement) loadingElement.style.display = 'none';

        if (data.sources && data.sources.length > 0) {
            displaySources(data.sources, sourceContainer)
        } else {
            if (sourceContainer) sourceContainer.innerHTML = '<p>No sources found</p>';
        }
    }

    catch (error) {
        if (loadingElement) loadingElement.style.display = 'none';
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.textContent = 'Failed to load sources. Please try again later.';
        }
        console.error('Error loading sources:', error)
    }

    function displaySources(sources, container) {
        if (!container) return;
        container.innerHTML = '';

        sources.forEach(source => {
            const card = createSourceCard(source);
            container.appendChild(card);
        });

    }

    function createSourceCard(source) {

        const card = document.createElement('a')

        card.className = 'source-card'

        card.href = `source-news.html?source=${source.id}&name=${encodeURIComponent(source.name)}`;

        card.innerHTML = `
        <h3>${source.name || 'Unknown'}</h3>
        <span class="category">${source.category || ''}</span>
        <p class="description">${source.description || ''}</p>
    `;

        return card;

    }
}

document.addEventListener('DOMContentLoaded', loadSources);

