import React from 'react';
import { Link } from "react-router-dom";

import userStore from '../store/user';
import todosStore from '../store/todos';

class BaseComponent extends React.PureComponent {
    rerender = () => {
        this.setState({
            _rerender: new Date(),
        });
    }
}

class List extends BaseComponent {
    state = {
        title: '',
        tags: '',
        status: ''
    }

    componentDidMount() {
        this.unsubTodos = todosStore.subscribe(this.rerender);
    }

    render() {
        return (
            <div className="component">
                <div className="card-container">
                    <form onSubmit={this.addTodo}>
                        <p><input placeholder="Todo Title" type='text' value={this.state.title} onChange={this.setTitle} /></p>
                        <p><input placeholder="Todo Tags (Separate with , for more tags)" type='text' value={this.state.tags} onChange={this.setTags} /></p>
                        <p><button>Add New</button></p>
                    </form>
                </div>

                <div className="card-container">
                    {
                        todosStore.data.map((todo, index) => (
                            <span className="card" key={todo._id}>
                                <svg className="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>

                                <Link to="/detail">
                                    <div className="card-list">
                                        <div>{todo.text} <span className={todo.status}>{todo.status}</span></div>
                                        <div className="tags">{(todo.tags) ? todo.tags : '-'}</div>
                                    </div>
                                </Link>

                                <div className="spacer"></div>
                                <svg className="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
                            </span>
                        ))
                    }
                </div>
            </div>
        );
    };

    setTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    }

    setTags = (e) => {
        this.setState({
            tags: e.target.value,
        });
    }

    addTodo = async (e) => {
        e.preventDefault();

        await todosStore.addItem({
            text: this.state.title,
            tags: this.state.tags,
            status: 'todo',
        }, userStore.data);

        this.setState({
            title: '',
            tags: '',
            status: ''
        });
    }
}

export default List;