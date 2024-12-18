import { memo, useCallback, useEffect, useState } from 'react';
import { getQuotes } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, PlusIcon, RefreshCwIcon } from 'lucide-react';
import placeholderImage from '../assets/placeholderImage.png';

const QuoteListPage = () => {
  const navigate = useNavigate();

  const [allQuotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadQuotes = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const quotesResponse = await getQuotes(10, offset);
      const quotesData = quotesResponse?.data?.data;

      if (quotesData && quotesData?.length > 0) {
        setQuotes((prevQuotes) => [...prevQuotes, ...quotesData]);
        setOffset((prevOffset) => prevOffset + 10);

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const renderQuoteImage = (quote) => {
    if (!quote?.mediaUrl) {
      return (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-gray-500" />
        </div>
      );
    }

    return (
      <img
        src={quote?.mediaUrl}
        alt="quote"
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
      />
    );
  };

  const handleCreateQuote = () => {
    navigate('/create');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allQuotes?.map((quote) => (
          <div
            key={quote?.id}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="w-full h-48 relative overflow-hidden">
              {renderQuoteImage(quote)}
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-800 line-clamp-2 ml-1">
                {quote?.text}
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {quote?.username?.charAt(0).toUpperCase()}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p className="truncate mr-2">{quote?.username}</p>
                  <p>{new Date(quote?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allQuotes && allQuotes?.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No quotes found</p>
          <button
            onClick={loadQuotes}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto space-x-2"
            onClick={loadQuotes}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all group"
        onClick={handleCreateQuote}
        title="Create quote"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default memo(QuoteListPage);
