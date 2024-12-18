import axiosInstance from './fetcher';

export const loginUser = (username, otp) =>
  axiosInstance.post('/login', { username, otp });

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post(
    'https://crafto.app/crafto/v1.0/media/assignment/upload',
    formData,
  );
};

export const createQuote = ({ text, mediaUrl }) =>
  axiosInstance.post('/postQuote', { text, mediaUrl });

export const getQuotes = (limit, offset) =>
  axiosInstance.get(`/getQuotes?limit=${limit}&offset=${offset}`);
