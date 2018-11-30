import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import './card.css';

const Card = (props) => {
	return (
		<div className='mainDiv'>
			<img className='image' src={props.avatar_url} />
			<div className='card'>
				<div className='cardItem'>
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
			{props.cards.map(card => <Card key={card.id} {...card}/>)}
		</div>
	);
};

class Form extends Component {
	state = { userName: '' }
	handleSubmit = (event) => {
		event.preventDefault();
		axios.get(`https://api.github.com/users/${this.state.userName}`)
		.then(resp => {
			this.props.onSubmit(resp.data);
			this.setState({ userName: '' });
		})
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
		cards: []
	};

	addNewCard = (cardInfo) => {
		this.setState(prevState => ({
			cards: prevState.cards.concat(cardInfo)
		}));
	};

	popButton = (cardInfo) => {
		let cards = [...this.state.cards]		
		if (cards){
			cards.pop();
		} else {
			cards = [];
		}
		this.setState({
			cards: cards
		});
	};

	resetButton = (cardInfo) => {
		this.setState(prevState => ({
			cards: []
		}));
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard} />
				<button className='cardItem' onClick={this.popButton}>Pop</button>
				<button className='cardItem' onClick={this.resetButton}>Reset</button>
				<CardList cards={this.state.cards} />
			</div>
		);
	};
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
)
