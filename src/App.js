import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import NextButton from "./Components/NextButton";

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: 'loading',
	index: 0,
	answer: null,
	score: 0
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
				status: 'start'
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
		answer
	} = state;

	console.log(questions);
	const numQuestions = questions.length;

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
					<Questions question={questions[index]} dispatch={dispatch} answer={answer} />
					<NextButton dispatch={dispatch} answer={answer} />
				</>
			)}
			{ 'error' === status && <Error /> }
		</Main>
	</div>
}
