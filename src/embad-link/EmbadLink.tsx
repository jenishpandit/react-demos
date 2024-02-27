import React, { useState, } from 'react';
import ReactPlayer from 'react-player';


const EmbadLink = () => {
    const [link, setLink] = useState('');
    const [embedCode, setEmbedCode] = useState<any>(null);

    const handleEmbed = () => {
        const isYouTubeLink = link.includes('youtube.com');

        if (isYouTubeLink) {

            const reactPlayer = (
                <ReactPlayer className='mx-auto my-auto' url={link} width='70%' height='300px' />

            );
            setEmbedCode(reactPlayer)
        } else {

            const iFrameCode = <iframe className='mx-auto my-auto' src={link} width='70%' height='300px' />;
            setEmbedCode(iFrameCode)
        }

};
return (
    <div className="text-center  text-4xl p-10 ">
        <div className='font-bold'>Embeded Link</div>
        <div className="flex items-center justify-center p-4 ">
            <div className="bg-gray-200 p-4 rounded-lg w-3/4">
                <input
                    type="text"
                    placeholder="Enter link..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border border-gray-300 p-2  rounded text-lg controls w-3/4"
                />
                <button
                    onClick={handleEmbed}
                    className=" px-4 py-2 bg-blue-500 text-lg text-white rounded"
                >
                    Embed Link
                </button>
            </div>
        </div>
        {embedCode && (
            <div className='m-4'>
                <p className='text-2xl italic'>Embeded Content
                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-700"></hr></p>
                <div > {embedCode} </div>
            </div>
        )}
    </div>
);
};

export default EmbadLink;
