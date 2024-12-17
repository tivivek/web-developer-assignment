import { useState } from 'react';
import { createQuote, uploadImage } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateQuotePage = () => {
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const uploadData = await uploadImage(file);
      console.log(uploadData, 'uploadData');
      await createQuote(text, uploadData?.data[0]?.url);
      navigate('/quotes');
    } catch (error) {
      console.error('Login Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Quote text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        className="bg-blue-500 text-white p-2 mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateQuotePage;
