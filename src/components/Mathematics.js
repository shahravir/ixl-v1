import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Subjects from './Subjects'; // Import your Subjects component
import './Mathematics.css'; // Import your CSS file for styling

const Mathematics = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedQuestions = localStorage.getItem('math_questions');
        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));
        } else {
          const response = await axios.get('http://localhost:8080/questions');
          const fetchedQuestions = response.data;
          setQuestions(fetchedQuestions);
          localStorage.setItem('math_questions', JSON.stringify(fetchedQuestions));
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = () => {
    const correctAnswer = parseFloat(questions[currentPage - 1].correct_answer);
    const userAnswerNumber = parseFloat(userAnswer);
    if (!isNaN(userAnswerNumber) && userAnswerNumber === correctAnswer) {
      setResult('Correct! Moving to the next question...');
      setTimeout(() => {
        setResult('');
        setUserAnswer('');
        setCurrentPage(currentPage + 1);
      }, 2000); // Move to the next question after 2 seconds
    } else {
      setResult('Incorrect. Please try again.');
    }
  };

  const handleMCQSelection = (choice) => {
    setUserAnswer(choice);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // You can render a loading indicator while fetching questions
  }

  // Check if all questions are completed
  if (currentPage > questions.length) {
    return (
      <div className="mathematics-page">
        <h2>Mathematics Quiz</h2>
        <p>Congratulations! You have completed the quiz.</p>
        <button className="finish-button" onClick={() => window.location.href = '/subjects'}>
          Finish
        </button>
      </div>
    );
  }

  return (
    <div className="mathematics-page">
      <h2>Mathematics Quiz</h2>
      <div className="question-container">
        <p className="question-text">{questions[currentPage - 1].question_text}</p>
      </div>
      <div className="answer-container">
        {questions[currentPage - 1].question_type === 'mcq' && (
          <div className="mcq-options">
            {questions[currentPage - 1].mc.map((choice, index) => (
              <button
                key={index}
                className="mcq-button"
                onClick={() => handleMCQSelection(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        )}
        {questions[currentPage - 1].question_type === 'input' && (
          <div className="answer-input">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
            />
          </div>
        )}
      </div>
      <div className="answer-input">
        <button className="next-button" onClick={handleSubmit}>
          {currentPage === questions.length ? 'Submit' : 'Next'}
        </button>
      </div>
      <div className="result">
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default Mathematics;
