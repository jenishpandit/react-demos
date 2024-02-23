import React, { useState } from 'react';
import { Spin, message } from 'antd';
import UrlShortInput from './component/UrlShortInput';
import UrlDisplay from './component/UrlDisplay';
import axios from 'axios';

const ShortUrl = () => {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShortenUrl = async (inputUrl: string) => {
    try {
      setLoading(true);
      const response = await axios.post<{ message: string }>('https://shortty.vercel.app/api/shorty-url/generate', {
        urlValue: inputUrl
      });

      const { message: shortenedMessage } = response.data;
      setShortenedUrl(shortenedMessage);
      
    } catch (error:any) {
      console.log('Error shortening URL:', error.message);
      message.error('Failed to shorten URL. Please try again.');
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-blue-50'>
      <div className="flex items-center justify-center  ">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md bg-blue-50 mt-10">
          <h1 className="text-4xl font-bold text-blue-500 text-center mb-6">Short URL</h1>
          <UrlShortInput onShortenUrl={handleShortenUrl} />
         {loading && <div className="text-center mt-4"><Spin  size='large'/></div>}

          {!loading && shortenedUrl && <UrlDisplay shortenedUrl={shortenedUrl} />}
        </div>
      </div>
    </div>

  );
  
};
export default ShortUrl;
