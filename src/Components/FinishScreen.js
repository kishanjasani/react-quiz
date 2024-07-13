import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
	const { score, maxTotalScore, highscore, dispatch } = useQuiz();

	const percentage = (score / maxTotalScore) * 100;

	let emoji;

	if ( percentage === 100 ) { emoji = '🥇' }
	if ( percentage >= 80 && percentage < 100 ) { emoji = '🎉' }
	if ( percentage >= 50 && percentage < 80 ) { emoji = '🙃' }
	if ( percentage >= 80 && percentage < 100 ) { emoji = '🤨' }
	if ( percentage === 0 ) { emoji = '🤦‍♂️' }

	return (
		<>
			<p className="result">
				<span>{emoji}</span> You scrored <strong>{score}</strong> out of {maxTotalScore} points ( {Math.ceil(percentage)}% )
			</p>
			<p className="highscore">
				(Highscore: {highscore} points)
			</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({type: 'restart'})}
			>
				Restart Quiz!
			</button>
		</>
	);
}
