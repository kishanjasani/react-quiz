import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
	const { index, numQuestions, score, maxTotalScore, answer } = useQuiz();

	return (
		<header className="progress">
			<progress max={numQuestions} value={ index + Number( null !== answer ) } />
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{score}</strong> / {maxTotalScore}
			</p>
		</header>
	);
}
