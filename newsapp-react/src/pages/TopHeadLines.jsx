import { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import '../styles/Pages.css';

function TopHeadlines() {
    const [status, setStatus] = useState('loading');
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function load() {
            setStatus('loading');
            setError('');

            try {
                const data = await fetchNews('/top-headlines?country=us&apiKey=');
                const list = Array.isArray(data?.articles) ? data.articles : [];

                if (!isMounted) return;

                if (list.length === 0) {
                    setArticles([]);
                    setStatus('empty');
                } else {
                    setArticles(list);
                    setStatus('success');
                }
            } catch (err) {
                if (!isMounted) return;
                setError(err?.message || 'Failed to load news');
                setStatus('error');
            }
        }

        load();
        return () => { isMounted = false; };
    }, []);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'error') return <p>Error: {error}</p>;
    if (status === 'empty') return <p>No articles found.</p>;

    return (
        <div className="container">
            <section className="hero">
                <h2>Top US Headlines</h2>
                <p>Stay updated with the latest news from across the United States</p>
            </section>

            <div className="news-grid">
                {articles.map((a) => (
                    <article key={a.url} className="news-card">
                        <h3>{a.title}</h3>
                        <p>{a.source?.name}</p>
                        <p>{new Date(a.publishedAt).toLocaleDateString()}</p>
                        <a href={a.url} target="_blank" rel="noreferrer">Read more</a>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default TopHeadlines;
