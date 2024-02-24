import React, { useState } from 'react';
import { quizData } from '../../data';
import { QuizDataItem } from '../../data';
import './styles.css';
import { Typography } from '@mui/material';


export const GameBoard = () => {
	const [questions, setQuestions] = useState<QuizDataItem[]>(quizData);
	const [currentDescriptionId, setCurrentDescriptionId] = useState<number>(1);
	const [answer, setAnswer] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const isAnswerCorrect =
			answer.trim().toLowerCase() ===
			questions
				.filter((question) => question.id === currentDescriptionId)[0]
				.word.trim()
				.toLowerCase();
    const isAnswerEmpty = answer.trim().length === 0;

		if (isAnswerCorrect) {
      const updatedQuestions:QuizDataItem[] = questions.map(question => {
        if (question.id === currentDescriptionId) {
         return {...question, class: 'correct'} 
        } else return question;
      });
      setQuestions(updatedQuestions);
    } else if (!isAnswerEmpty) {
      const updatedQuestions:QuizDataItem[] = questions.map(question => {
        if (question.id === currentDescriptionId) {
         return {...question, class: 'wrong'} 
        } else return question;
      });
      setQuestions(updatedQuestions);
    } else {
      const updatedQuestions:QuizDataItem[] = questions.map(question => {
        if (question.id === currentDescriptionId) {
         return {...question, class: 'pass'} 
        } else return question;
      });
      setQuestions(updatedQuestions);
    }
    setAnswer('');

    if (currentDescriptionId !== questions.length) {
      const currentQuestion = questions.filter(q => q.id ===currentDescriptionId)[0];
      if (currentQuestion.class === 'pass') {
        const passedQuestionIds = questions.filter(q => q.class ==='pass').map(q => q.id).sort((a,b) => a - b);

        if (passedQuestionIds.length > 0) {
          const currentPassedQuestionIndex = passedQuestionIds.findIndex(id => id ===currentQuestion.id);
          const nextPassedQuestionId = passedQuestionIds[currentPassedQuestionIndex + 1];
          setCurrentDescriptionId(nextPassedQuestionId);
        }
      } else {
        setCurrentDescriptionId(currentDescriptionId + 1);
      }
    } else {
      const passedQuestionIds = questions.filter(q => q.class ==='pass').map(q => q.id).sort((a,b) => a - b);
      if (passedQuestionIds.length > 0) {
        const nextPassedQuestionId = passedQuestionIds[0];
        setCurrentDescriptionId(nextPassedQuestionId);
      } else {
        console.log('Game over!');
        // TODO: DO something here to indicated that the game is finished
      }
    }
	};

	return (
		<div>
			<div>
				<ul className='letters-list'>
					{questions.map((question) => (
						<li
							key={question.id}
							className={`letters ${
								question?.class || ''
							}
              ${
								question?.class || ''
							}
              ${
								question.id === currentDescriptionId
									? 'selected-letter'
									: 'transparent'
							} `}
						>
							{question.firstLetter}
						</li>
					))}
				</ul>
			</div>
			<div>
				<div className='descriptons'>
					<Typography className='description'>
						{
							questions.filter(
								(question) => question.id === currentDescriptionId
							)[0].description
						}
					</Typography>
				</div>
			</div>
			<div className='user-answers'>
				<form onSubmit={handleSubmit}>
					<input
						className='answer-input'
						type='text'
						placeholder='Please, write your answer'
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
					/>
				</form>
			</div>
		</div>
	);
};
