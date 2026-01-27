

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopHeadlines from './pages/TopHeadlines';
import Sources from './pages/Sources';
import SourceNews from './pages/SourceNews';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<TopHeadlines />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/source-news" element={<SourceNews />} />
      </Routes>
    </div>
  );
}

export default App;
