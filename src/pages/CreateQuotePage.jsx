import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage, createQuote } from '../api/Api';
import { toast } from 'react-toastify';
import { ImageIcon } from 'lucide-react';

const CreateQuotePage = () => {
  const [quoteText, setQuoteText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quoteText || !imageFile) {
      toast.error('Please enter a quote and upload an image');
      return;
    }

    setLoading(true);

    try {
      const uploadResponse = await uploadImage(imageFile);
      const mediaUrl = uploadResponse?.data[0]?.url;

      if (!mediaUrl) {
        toast.error('Failed to upload image');
        return;
      }

      await createQuote({
        text: quoteText,
        mediaUrl: mediaUrl,
      });

      toast.success('Quote created successfully!');
      navigate('/quotes');
    } catch (error) {
      console.error('Quote Creation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a Quote
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <textarea
              id="quote"
              name="quote"
              rows="4"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your quote"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              required
            />

            <div className="relative w-full h-64 border-4 border-dashed border-gray-300 hover:border-indigo-300 group">
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-gray-400 group-hover:text-indigo-600" />
                  <p className="text-sm text-gray-400 group-hover:text-indigo-600 mt-2">
                    Click to upload image
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !imageFile}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || !imageFile
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {loading ? 'Creating Quote...' : 'Create Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateQuotePage);
