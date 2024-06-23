import React, { useEffect, useState } from 'react';
import { quizData } from '../../data';
import { QuizDataItem } from '../../data';
import './styles.css';
import { Typography } from '@mui/material';
import { Preview } from '@mui/icons-material';

interface ClassItem {
	id: number;
	class: string;
}

export const GameBoard = () => {
	const [questions, setQuestions] = useState<QuizDataItem[]>(quizData);
	const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
	const [answer, setAnswer] = useState('');
	const [isFirstRound, setIsFirstRound] = useState(true);
	const [isGameComplete, setIsGameComplete] = useState(false);

	useEffect(() => {
		const unansweredQuestions = questions.filter((q) => !q.isAnswered);
		if (unansweredQuestions.length === 0) {
			setIsGameComplete(true);
		}
	}, [questions]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (currentDescriptionIndex === questions.length - 1) {
			setIsFirstRound(false);
		}

		if (answer.trim().length > 0) {
			// Answer is correct
			if (answer === questions[currentDescriptionIndex].word) {
				setQuestions((prev) => [
					...prev.map((q) => {
						if (q.id === currentDescriptionIndex) {
							q.classname = 'correct';
							q.isAnswered = true;
						}
						return q;
					}),
				]);
				// Answer is not correct
			} else {
				setQuestions((prev) => [
					...prev.map((q) => {
						if (q.id === currentDescriptionIndex) {
							q.classname = 'wrong';
							q.isAnswered = true;
						}
						return q;
					}),
				]);
			}
			// No answer
		} else {
			setQuestions((prev) => [
				...prev.map((q) => {
					if (q.id === currentDescriptionIndex) {
						q.classname = 'pass';
					}
					return q;
				}),
			]);
		}

		if (isFirstRound && currentDescriptionIndex < questions.length - 1) {
			setCurrentDescriptionIndex((prev) => prev + 1);
		} else {
			const passedQuestionIds = questions
				.filter((q) => !q.isAnswered)
				.map((q) => q.id);

			// The passed question is the last in the list
			if (
				currentDescriptionIndex ===
				passedQuestionIds[passedQuestionIds.length - 1]
			) {
				setCurrentDescriptionIndex(passedQuestionIds[0]);
			} else {
				const indexOfCurrentPassedQuestion = passedQuestionIds.indexOf(
					currentDescriptionIndex
				);

				setCurrentDescriptionIndex(
					passedQuestionIds[indexOfCurrentPassedQuestion + 1]
				);
			}
		}
		setAnswer('');
	};

	return isGameComplete ? (
		<div> Gameover </div>
	) : (
		<div>
			<div>
				<ul className='letters-list'>
					{questions.map((question) => (
						<li
							key={question.id}
							className={`letters ${question.classname || ''} ${
								question.id === currentDescriptionIndex
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
						{questions[currentDescriptionIndex].description}
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
