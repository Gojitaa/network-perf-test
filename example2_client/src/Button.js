const noop = () => {}

const Button = ({ onClick = noop, id  } = {}) => {
	const template = () => `<button id='${id}' type='button'> Load emojies </button>`
	const render = () => template();
	const setUpListener = () => {
		const button = document.querySelector(`#${id}`)
		button.addEventListener("click", onClick)

		return () => {
			button.removeEventListener('click', onClick)
		}
	}

	return {
		render: () => {
			return [
				render(), 
				setUpListener
			];

		}
	}
}

export default Button;