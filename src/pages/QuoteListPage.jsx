import { useCallback, useEffect, useState } from 'react';
import { getQuotes } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuoteListPage = () => {
  const [allQuotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadQuotes = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const quotesResponse = await getQuotes(10, offset);
      const quotesData = quotesResponse?.data?.data;

      if (quotesData && quotesData?.length > 0) {
        setQuotes((prevQuotes) => [...prevQuotes, ...quotesData]);
        setOffset((prevOffset) => prevOffset + 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset]);

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allQuotes?.map((quote) => (
          <div
            key={quote?.id}
            className="relative max-w-xs bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="w-full h-40 relative">
              <img
                src={quote?.mediaUrl}
                alt="quote"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {quote?.text}
              </h2>
              <p className="text-sm text-gray-600">{quote?.username}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          className="block mx-auto mt-6 bg-blue-500 text-white px-6 py-2 rounded"
          onClick={loadQuotes}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}

      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full"
        onClick={() => navigate('/create')}
      >
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
