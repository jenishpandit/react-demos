import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizApp.css';
import _ from 'lodash';

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type UserAnswer = {
  question: string;
  answer: string;
  correctAnswer: string; // Added correctAnswer field
  isCorrect: boolean;
};

type Category = {
  id: number;
  name: string;
};

const QuizApp = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>('Choose Level');
  const [numQuestions, setNumQuestions] = useState<number>(0);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<{ trivia_categories: Category[] }>('https://opentdb.com/api_category.php');
      setCategories(response.data.trivia_categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const startQuiz = async () => {
    if (selectedCategory) {
      try {
        console.log('Starting quiz...');
        const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple&category=${selectedCategory}&difficulty=${difficulty}`);
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
  };

  const handleAnswerSubmit = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        answer: selectedAnswer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuestions([]);
    setSelectedCategory(null);
    setDifficulty('Choose Level');
    setNumQuestions(5);
  };

  return (
    <div className="quiz-container">
      {questions.length === 0 ? (
        <div className="category-selection-container">
          <h1>Quiz App</h1>
          <br></br>
          <h2>Select Quiz Options</h2>
          <div>
            <label htmlFor="category">Select a Category:</label>
            <select className="category" onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="" disabled selected>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <br></br>
          <div>
            <label htmlFor="difficulty">Select Difficulty: </label>
            <select className='category' id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
              <option value='' disabled selected >Choose Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <br></br>
            <label htmlFor="numQuestions">Number of Questions:</label>
            <input
              className='number'
              type="number"
              id="numQuestions"
              min={1}
              max={50}
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
            />
          </div>
          <button className='btn' onClick={startQuiz} disabled={!selectedCategory || numQuestions < 1 || numQuestions > 50}>Start Quiz</button>
        </div>
      ) : currentQuestionIndex < questions.length ? (
        <div className="question-container">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>{questions[currentQuestionIndex].question}</h3>

          <div className='answers-container'>
            {_.map([...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer],(answer,index)=>(
              <button className='btn' key={answer} onClick={()=>handleAnswerSubmit(answer)}>
                <span>{index + 1}.</span>{answer}
              </button>  
            ))}
          </div>

          {/* Next button will be shown after the user answers */}
          {userAnswers.length > currentQuestionIndex && (
            <button className='btn' onClick={handleNextQuestion}>Next</button>
          )}
        </div>
      ) : (
        <div className='result-container'>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>

          <h3>Your Answers:</h3>
          <ul className='result-table'>
            <li className='table-header'>
              <span>Question</span>
              <span>Your Answer</span>
              <span>Correct Answer</span>
              <span>Correct</span>
            </li>
            {_.map(userAnswers, (userAnswer, index) => (
              <li key={index} className={userAnswer.isCorrect ? 'correct' : 'incorrect'}>
                <span>{userAnswer.question}</span>|
                <span>{userAnswer.answer}</span>|
                <span>{userAnswer.correctAnswer}</span>|
                <span>{userAnswer.isCorrect ? 'Yes' : 'No'}</span>
              </li>
            ))}
          </ul>

          <button className='btn'onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
