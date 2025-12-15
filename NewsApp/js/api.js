async function fetchNews(endpoint) {
    try {
        const url = `${BASE_URL}${endpoint}&apiKey=${API_KEY}`;

        console.log('Fetching from:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fecthing news:', error);
        throw error;
    }
}
