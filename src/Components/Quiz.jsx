import React, { useState } from 'react';
import questions from './Questions';
import './style.css';

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect, selectedAnswer) => {
    const answer = {
      question: currentQuestion.question,
      selectedAnswer,
      isCorrect,
    };

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }

    setAnswers([...answers, answer]);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
  };

  const renderQuiz = () => {
    return (
      <div className='container'>
        <h1>Quiz</h1>
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.answers.map((answer) => (
            <li key={answer.text}>
              <button
                onClick={() => handleAnswer(answer.isCorrect, answer.text)}
                disabled={showScore}
              >
                {answer.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div className='container'>
        <h1>Quiz Score</h1>
        <p>You scored {score} out of {questions.length}.</p>
        <h2>Answers:</h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <p>Question: {answer.question}</p>
              <p>Correct Answer: {currentQuestion.answers.find((a) => a.isCorrect).text}</p>
              <p>Your Answer: {answer.selectedAnswer}</p>
              <p>Score: {answer.isCorrect ? 1 : 0}</p>
            </li>
          ))}
        </ul>
        <button className='reset'onClick={resetQuiz}>Try Again</button>
      </div>
    );
  };

  return (
    <div >
      {showScore ? renderScore() : renderQuiz()}
      {/* {showScore && (
        <button onClick={resetQuiz}>Try Again</button>
      )} */}
    </div>
  );
}

export default Quiz;
