import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const NewsCard = ({ article }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-4 hover:shadow-2xl hover:bg-gray-750 transition-all duration-300 border border-gray-700">
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-100 leading-tight">
        {article.title}
      </h3>
      <p className="text-gray-300 mb-3 text-sm leading-relaxed">
        {article.description}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
        <span className="bg-gray-700 px-2 py-1 rounded">{article.source?.name}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg"
      >
        Read More →
      </a>
    </div>
  );
};

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState('techcrunch');
  const [error, setError] = useState(null);

  const sources = [
    { key: 'techcrunch', label: 'TechCrunch', domain: 'Technology' },
    { key: 'apple', label: 'Apple News', domain: 'Technology' },
    { key: 'wsj', label: 'Wall Street Journal', domain: 'Business' },
    { key: 'business', label: 'US Business News', domain: 'Business' },
    { key: 'india', label: 'India Headlines', domain: 'Regional' }
  ];

  const fetchNews = async (source) => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await axios.get(`${apiUrl}/api/${source}`);
      setArticles(response.data);
    } catch (err) {
      setError('Failed to fetch news. Please make sure the server is running.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedSource);
  }, [selectedSource]);

  const handleSourceChange = (source) => {
    setSelectedSource(source);
  };

  const groupedSources = sources.reduce((acc, source) => {
    if (!acc[source.domain]) {
      acc[source.domain] = [];
    }
    acc[source.domain].push(source);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <header className="bg-gray-800 shadow-2xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                🌙 News Fusion
              </h1>
              <p className="text-gray-400 mt-2">Stay updated with news from around the world</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-gray-400 text-sm">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Live Updates
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Domain-based Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">Select News Source by Domain</h2>
          {Object.entries(groupedSources).map(([domain, domainSources]) => (
            <div key={domain} className="mb-6">
              <h3 className="text-lg font-medium text-gray-300 mb-3 flex items-center">
                <span className="mr-2">
                  {domain === 'Technology' && '💻'}
                  {domain === 'Business' && '💼'}
                  {domain === 'Regional' && '🌍'}
                </span>
                {domain}
              </h3>
              <div className="flex flex-wrap gap-3">
                {domainSources.map((source) => (
                  <button
                    key={source.key}
                    onClick={() => handleSourceChange(source.key)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                      selectedSource === source.key
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-purple-500 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="mt-4 text-gray-400 animate-pulse">Fetching latest news...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-6 py-4 rounded-xl mb-6 shadow-lg">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {/* News Articles */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <p className="text-gray-400 text-lg">No articles found for the selected source.</p>
                <p className="text-gray-500 text-sm mt-2">Try selecting a different news source.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;