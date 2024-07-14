export default function NextButton({ dispatch, answer, index, numQuestions }) {
	if ( null === answer ) return null;

	if ( index < numQuestions - 1 ) {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({type: 'newQuestion'})}
			>
				Next
			</button>
		);
	}

	if ( index === numQuestions - 1 ) {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({type: 'finish'})}
			>
				Finish!
			</button>
		);
	}
}