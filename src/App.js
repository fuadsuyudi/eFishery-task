import React, { Component } from 'react';
import userStore from './store/user';
import todosStore from './store/todos';

import Home from './pages/Home';
import Login from './pages/Login';

import './App.css';

class App extends Component {
	state = {
		isInitialized: false,
	}

	render() {
		if (!this.state.isInitialized) {
			return null;
		}

		return (
			userStore.data.email ? (
				<Home />
			) : (
					<Login />
				)
		);
	}

	async componentDidMount() {
		await userStore.initialize();

		this.setState({
			isInitialized: true,
		});
	}

	async componentDidUpdate() {
		if (userStore.data.email && !todosStore.isInitialized) {
			
			todosStore.setName(userStore.data.id);
			await todosStore.initialize();
			
		}
	}
}

export default App;
