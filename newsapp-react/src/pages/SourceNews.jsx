import { Link } from 'react-router-dom';

function SourceNews() {
    return (
        <div className="container">
            <section className="hero">
                <Link to="/sources" className="back-link">← Back to Sources</Link>
                <h2>Source Articles</h2>
                <p>Articles from this source will appear here...</p>
            </section>

            <div className="news-grid">
                <p>Loading articles...</p>
            </div>
        </div>
    );
}

export default SourceNews;
