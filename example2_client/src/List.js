import ListItem from './ListItem'

const List = ({ elements }) => {
	const template = () => 
		`<div class='list'>
			<ul>
			${elements.map(element => ListItem({ element }).render()).join('')}
			</ul>
		</div>`

	const render = () => template();

	return {
		render
	}
}

export default List;