import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import './card.css';

const Card = (props) => {
	const style = {
		margin: '1em',
	}
	const style2 = {
		display: 'inline-block',
		marginLeft: 10,
	}

	const style3 = {
		fontsize: '1.25em',
		fontWeight: 'bold',
	}

	const imgStyle = {
		width: '75px',
		heigth: 'auto',
	}

	return (
		<div style={style}>
			<img style={imgStyle} src={props.avatar_url} />
			<div style={style2}>
				<div style={style3}>
					{props.name}
				</div>
				<div>
					{props.company}
				</div>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return (
		<div>
			{props.cards.map(card => <Card {...card}/>)}
		</div>
	);
};

class Form extends Component {
	state = { userName: '' }
	handleSubmit = (event) => {
		event.preventDefault();
	};
	render (){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text"
				value={this.state.userName}
				onChange={(event) => this.setState({ userName: event.target.value })}
				placeholder="Github username"
				required />
				<button type="submit">Add card</button>
			</form>
		);
	};
}


class App extends Component {
	state = {
		cards: [
			{
				name: "Luis Esteban",
				avatar_url: "https://avatars3.githubusercontent.com/u/13503868?s=460&v=4",
				company: "Unosquare",
			},
			{
				name: "Pepito",
				avatar_url: "https://avatars3.githubusercontent.com/u/13503868?s=460&v=4",
				company: "4MLabs",
			}
		]
	}
	render() {
		return (
			<div>
				<Form />
				<CardList cards={this.state.cards} />
			</div>
		);
	};
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
)
