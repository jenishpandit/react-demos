import { useState, FC } from 'react';
import { Input, Button } from 'antd'

type UrlShortenerFormProps = {
  onShortenUrl: (url: string) => any;
}

const UrlShortInput: FC<UrlShortenerFormProps> = ({ onShortenUrl }) => {
  const [inputUrl, setInputUrl] = useState('');
 
  return (
    <div>
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
          onClick={()=>onShortenUrl(inputUrl)}
        >
          Shorten URL
        </Button>
      </div>
    </div>
  );
};

export default UrlShortInput;
