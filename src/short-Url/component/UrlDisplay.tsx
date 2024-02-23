
import { useState, FC } from 'react';
import { Tag, Tooltip, message } from 'antd';
import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import QRCode from 'react-qr-code';

type ShortenedUrlDisplayProps = {
  shortenedUrl: string;
}

const UrlDisplay: FC<ShortenedUrlDisplayProps> = ({ shortenedUrl }) => {
  const [showQrCode, setShowQRCode] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortenedUrl);
    message.success('Copied to clipboard!');
  };
 
  const handleGenerateQrcode = () => {
    setShowQRCode(true);
  };

  return (
    <div className="mt-8">
      Shortened URL:
      <div className='mt-4 flex items-center space-x-2'>
        <Tag color='blue' className='text-lg h-10 '>
          <p className="mt-1 text-gray-700">{shortenedUrl}</p>
        </Tag>
        <Tooltip title='Copy'>
          <CopyOutlined className='text-lg cursor-pointer text-blue-500' style={{ fontSize: '30px' }} onClick={handleCopyUrl} />
        </Tooltip>
        <Tooltip title="Generate QR Code" >
          <QrcodeOutlined className='text-lg cursor-pointer text-blue-500' style={{ fontSize: '35px' }} onClick={handleGenerateQrcode} />
        </Tooltip>
      </div>
      {showQrCode && <div className="mt-4"><QRCode value={shortenedUrl} /></div>}
    </div>
  );
};

export default UrlDisplay;
