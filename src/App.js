import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const SEC_PER_QUESTION = 30;

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'start', 'finished'
	status: 'loading',
	index: 0,
	answer: null,
	score: 0,
	highscore: 0,
	secondsRemaining: null
};

function reducer( state, action ) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready'
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error'
			};
		case 'start':
			return {
				...state,
				status: 'start',
				secondsRemaining: state.questions.length * SEC_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				score: action.payload === question.correctOption
					? state.score + question.points
					: state.score
			};
		case 'newQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null
			}
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore: state.score > state.highscore ? state.score : state.highscore
			}
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
				highscore: state.highscore
			}
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status
			}
		default:
			throw new Error('Undefined Action type');
	}
}

export default function App() {

	const [ state, dispatch ] = useReducer( reducer, initialState );

	const {
		questions,
		status,
		index,
		answer,
		score,
		highscore,
		secondsRemaining
	} = state;

	const numQuestions = questions.length;

	const maxTotalScore = questions.reduce( (prev, cur) => prev + cur.points, 0 );

	useEffect(function() {
		fetch('http://localhost:8000/questions')
		.then((res) => res.json() )
		.then((data) => dispatch({type: 'dataReceived', payload: data}))
		.catch((err) => dispatch({type: 'dataFailed'}));
	}, []);

	return <div className="app">
		<Header />
		<Main>
			{ 'loading' === status && <Loader /> }
			{ 'ready' === status && <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> }
			{ 'start' === status && (
				<>
					<Progress
						index={index}
						numQuestions={numQuestions}
						answer={answer}
						score={score}
						maxTotalScore={maxTotalScore}
					/>
					<Questions question={questions[index]} dispatch={dispatch} answer={answer} />
					<Footer>
						<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
						<NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
					</Footer>
				</>
			)}
			{ 'finished' === status && (
				<FinishScreen score={score} maxTotalScore={maxTotalScore} highscore={highscore} dispatch={dispatch} />
			) }
			{ 'error' === status && <Error /> }
		</Main>
	</div>
}
