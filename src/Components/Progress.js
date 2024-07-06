export default function Progress({index, numQuestions, score, maxTotalScore, answer}) {
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
