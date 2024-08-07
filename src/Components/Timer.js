import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {

	const { dispatch, secondsRemaining } = useQuiz();

	const min = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	useEffect(function() {
		const cleanInterval = setInterval(function(){
			dispatch({type: 'tick'});
		}, 1000);

		return () => clearInterval(cleanInterval);
	}, [dispatch]);
	return (
		<div className="timer">
			{min < 10 && "0"}{min}:{seconds < 10 && "0"}{seconds}
		</div>
	);
}
