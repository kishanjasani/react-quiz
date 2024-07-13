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
import { useQuiz } from "./contexts/QuizContext";

export default function App() {

	const {
		status,
	} = useQuiz();

	return <div className="app">
		<Header />
		<Main>
			{ 'loading' === status && <Loader /> }
			{ 'ready' === status && <StartScreen /> }
			{ 'start' === status && (
				<>
					<Progress />
					<Questions />
					<Footer>
						<Timer />
						<NextButton />
					</Footer>
				</>
			)}
			{ 'finished' === status && (
				<FinishScreen />
			) }
			{ 'error' === status && <Error /> }
		</Main>
	</div>
}
