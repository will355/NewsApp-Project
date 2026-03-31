import { API_KEY, BASE_URL } from './config';

export async function fetchNews(endpoint) {
    try {
        const url = `${BASE_URL}${endpoint}${API_KEY}`;
        console.log('Fetching from:', url);

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Http Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}
