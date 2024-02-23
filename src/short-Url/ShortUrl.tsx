import { Button, Input, Space, message, Spin, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import axios from 'axios';

const ShortUrl = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQrCode, setShowQRCode] = useState(false);

  const handleShortenUrl = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://shortty.vercel.app/api/shorty-url/generate', {
        urlValue: inputUrl
      });

      const { message } = response.data;
      setShortenedUrl(message);
    } catch (error:any) {
      console.log('Error shortening URL:', error.message);
      message.error('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortenedUrl);
    message.success('Copied to clipboard!');
  };

  const handleGenerateQrcode = () => {
    setShowQRCode(true);
  };

  return (
    <div className='min-h-screen bg-blue-50'>
    <div className="flex items-center justify-center  ">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md bg-blue-50">
        <h1 className="text-4xl font-bold text-blue-500 text-center mb-6">Short URL</h1>
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Paste the URL to be shortened</h1>
        <div className="flex items-center space-x-4">
          <Input
            className="flex-grow focus:ring-0 h-9"
            placeholder="Enter the link here"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-9"
            type="primary"
            onClick={handleShortenUrl}
           
          >
            Shorten URL
          </Button>
        </div>
        {loading && <div className="text-center mt-4"><Spin  size='large'/></div>}
        {shortenedUrl && (
          <div className="mt-8">
          
              Shortened URL:
           
            <div className='mt-4 flex items-center space-x-2'>
            <Tag color='blue' className='text-lg h-10 '>
            <p className="mt-1 text-gray-700">{shortenedUrl}</p>
           </Tag>
                <Tooltip title='Copy'>
                <CopyOutlined className='text-lg cursor-pointer text-blue-500' style={{fontSize:'30px'}} onClick={handleCopyUrl} />
                </Tooltip>
                <Tooltip title="Genrate QR Code" >
                <QrcodeOutlined className='text-lg cursor-pointer text-blue-500' style={{fontSize:'35px'}} onClick={handleGenerateQrcode} />
                </Tooltip>
            </div>
            {showQrCode && <div className="mt-4"><QRCode value={shortenedUrl} /></div>}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ShortUrl;
