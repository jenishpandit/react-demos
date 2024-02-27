import React, { useState, useEffect } from 'react';
import { Button, Modal, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Confetti from 'react-confetti';

const TypingSpeed = () => {
  const [randomParagraph, setRandomParagraph] = useState<string>('');
  const [timer, setTimer] = useState<number>(10);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [changeParagraph, setChangeParagraph] = useState<boolean>(true);
  const [wpm, setWpm] = useState<number | null>(0);
  const [cpm, setCpm] = useState<number | null>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [levelMessage, setLevelMessage] = useState<string>('');
  const [tagColor, setTagColor] = useState<string>('red');

  const generateRandomParagraph = () => {
    // Generate simple sentence without considering difficulty level
    const sentences = [
      'A true friend should be cherished and whose friendship should be safeguarded.',
      'A true friend cares for you at all times.',
      'Road safety is very important for everyone.',
      'I need help describing light showers while the character sits inside the classroom looking through the window.',
      'I am a teacher; she is happy; we are friends.',
      'Books are an important part of our life. We read many kinds of books.',
      'Car color is red. BMW car is my favorite.',
      'A cat is a very beautiful animal.',
    ];

    const originalParagraph = sentences[Math.floor(Math.random() * sentences.length)];

    const repeatedParagraph = Array(4).fill(originalParagraph).join(' ');

    setRandomParagraph(repeatedParagraph);
  };

  const handleGenerateClick = () => {
    generateRandomParagraph();
    resetTimer();
    setIsTyping(false);
    setInputValue('');
    setChangeParagraph(true);
    setWpm(0);
    setCpm(0);
    setShowConfetti(false);
  };

  const handleStartClick = () => {
    setIsTyping(true);
    setChangeParagraph(false);
    setInputValue('');
  };

  const resetTimer = () => {
    setTimer(10);
  };

  const calculateResults = () => {
    const typedCharacters = inputValue.length;
    const typedWords = inputValue.split(/\s+/).filter(word => word !== '').length;
    const time = 10 - timer;

    const wpmCalculation = Math.round((typedWords / (time / 10)));

    if (wpmCalculation > (wpm || 0)) {
      setWpm(wpmCalculation);
      setCpm(Math.round((typedCharacters / time) * 10));
      setWordCount(typedWords);

      if (wpmCalculation >= 0 && wpmCalculation <= 20) {
        setLevelMessage('Poor');
        setTagColor('red');
      } else if (wpmCalculation > 20 && wpmCalculation <= 40) {
        setLevelMessage('Medium');
        setTagColor('green');
      } else if (wpmCalculation > 40 && wpmCalculation <= 60) {
        setLevelMessage('Good');
        setTagColor('blue');
      } else   {
        setLevelMessage('Very Good');
        setTagColor('purple');
      }
    }

    if (timer === 0) {
      setShowConfetti(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping) {
      handleStartClick();
    }
    setInputValue(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleGenerateClick();
  };

  const handleCancel = () => {
    setShowConfetti(false);
    handleGenerateClick();
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (changeParagraph) {
      generateRandomParagraph();
    }

    const timerInterval = setInterval(() => {
      if (timer > 0 && isTyping) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 0) {
        setIsTyping(false);
        calculateResults();
        resetTimer();
        setChangeParagraph(false);
        showModal();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, isTyping, changeParagraph]);

  useEffect(() => {
    if (showConfetti) {
      const confettiTimeout = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(confettiTimeout);
    }
  }, [showConfetti]);

  return (
    <div className='p-8  h-screen' style={{ backgroundImage: 'url(https://cdn5.vectorstock.com/i/1000x1000/14/94/colorful-alphabet-seamless-wallpaper-pattern-vector-14201494.jpg)', backgroundSize: 'cover' }}>
      <div className='text-4xl font-bold' style={{ marginLeft: '40%' }}>
        Typing Speed App
      </div>
      <br />
      <div className='mx-auto p-4 bg-white rounded shadow-lg bg-lightcyan' style={{ width: '55%' }}>
        <p className='text-gray-800 text-2xl leading-relaxed'>{randomParagraph}</p>
      </div>
      <div className='flex justify-center mt-8 space-x-4'>
        <Button
          type='primary'
          className='bg-gray-800 text-gold h-12 px-6'
          onClick={handleGenerateClick}
        >
          Generate
        </Button>
        <Button
          type='primary'
          className='bg-gray-800 text-gold h-12 px-6'
          onClick={handleStartClick}
          disabled={isTyping}
        >
          Start
        </Button>
      </div>
      <div>
        {showConfetti && <Confetti />}
        <p style={{ marginLeft: '45%' }} className='text-2xl font-bold'>
          Time left: {timer}s
        </p>
      </div>
      <div className='flex items-center justify-center m-7 p-4 border rounded-lg shadow-md' style={{ marginLeft: '330px', width: '55%' }}>
        <TextArea
          style={{ overflow: "hidden" }}
          className='border-none focus:ring-0 text-3xl font-bold'
          placeholder='Start typing'
          value={inputValue}
          onChange={handleInputChange}
        ></TextArea>
      </div>
      <Modal style={{ backgroundColor: 'skyblue' }}
        title="Time's up!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="tryAgain" type="primary" style={{ backgroundColor: 'black', color: 'white', marginRight: '180px', height: '50px', width: '100px', padding: '5px' }} onClick={handleOk}>
            Try Again
          </Button>,
        ]}
      >
        <div>
          <p className='text-2xl font-bold' style={{ color: 'GrayText', fontFamily: "cursive" }}>Your time is up. </p>
          <br></br>
          <p className='text-xl' style={{fontFamily:'cursive'}}>Your WPM  :<strong> {wpm} </strong> </p>
          <br></br>
          <p className='text-xl' style={{fontFamily:'cursive'}}>Your CPM  :<strong> {cpm} </strong></p>
          <br></br>
          <p className='text-xl' style={{fontFamily:'cursive'}}>Typing Level : <Tag color={tagColor} style={{ marginTop: '10px' }}>{levelMessage}</Tag> </p>
        </div>
      </Modal>
    </div>
  );
};

export default TypingSpeed;
