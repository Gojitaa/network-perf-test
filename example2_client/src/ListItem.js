const ListItem = ({ element }) => {
	const template = () => `<li>${element.name}</li>`
	const render = () => template();

	return {
		render
	}
}

export default ListItem