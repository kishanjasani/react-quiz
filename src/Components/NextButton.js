export default function NextButton({ dispatch, answer }) {
	if ( null === answer ) return null;

	return (
		<button
			className="btn btn-ui"
			onClick={() => dispatch({type: 'newQuestion'})}
		>
			Next
		</button>
	);
}
