import Button from './Button'
import List from './List'
import PerfCure from 'perfcure';
const EMOJIE_NAMES = ['airplane', 'champagne', 'cherry_blossom', 'chipmunk', 'dark_sunglasses', 'electron', 'react', 'blowfish', 'blossom']


const App = () => {
	const perfCure = new PerfCure();
	state = {
		elements: [],
		setState(newState) {
			state = {...state, ...newState}
			render(document.querySelector('#root'));
		}
	};

	const getEmojies = async () => {
		perfCure.start('emojieFetches', 'resource', (e) => console.log(e))
		
		const emojies = await Promise.all(
			EMOJIE_NAMES.map(emojie => 
				fetch(`https://localhost:3000/api/emojies/${emojie}`)
					.then(resp => resp.json())
					.catch(err => console.error(err.trace))
			)
		)

		perfCure.get('emojieFetches');

		state.setState({ elements: emojies })
	}

	const [button, registerEvent] = Button({ onClick: getEmojies, id: 'fetchEmojies' }).render();

	const template = () => 
		`<div class='app'>
			${button}
			${List({ elements: state.elements }).render()}
		</div>`

	const render = root => {
		root.innerHTML = template()
		registerEvent();
	}

	return {
		render
	}
}

export default App;