
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <h1 className="logo">📰 NewsApp</h1>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Top Headlines</Link>
                    </li>
                    <li>
                        <Link to="/sources">Sources</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
