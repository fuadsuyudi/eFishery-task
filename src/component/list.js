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
        id: null,
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
                        {
                            (this.state.id) ?
                                <p><input placeholder="Todo Id" type='hidden' value={this.state.id} /></p> :
                                ''
                        }
                        <p><input placeholder="Todo Title" type='text' value={this.state.title} onChange={this.setTitle} /></p>
                        <p><input placeholder="Todo Tags (Separate with , for more tags)" type='text' value={this.state.tags} onChange={this.setTags} /></p>
                        <p>
                            {
                                (this.state.id) ?
                                    <button type="button" onClick={this.setUpdate}>Update</button> :
                                    <button type="submit">Add New</button>
                            }
                            <button type="reset" onClick={this.setClear}>Clear</button>
                            <button type="button" onClick={this.syncTask}>Sync</button>
                        </p>
                    </form>
                </div>

                <div className="card-container">
                    {
                        todosStore.data.map((todo, index) => (
                            <span className="card" key={todo._id}>
                                <svg className="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>

                                {/* <Link to="/detail"> */}
                                <div className="card-list pointer" onClick={() => this.setEdit(todo)}>
                                    <div>
                                        {todo.text}
                                        <span className={todo.status}>{todo.status}</span>
                                        {
                                            (!todosStore.checkIsUploaded(todo)) ?
                                                <span className="delete">offline</span> :
                                                <span className="done">online</span>
                                        }
                                    </div>
                                    <div className="tags">{(todo.tags) ? todo.tags : '-'}</div>
                                </div>
                                {/* </Link> */}

                                <div className="spacer"></div>

                                <div>
                                    {(todo.status && todo.status !== 'todo') ? <span onClick={() => this.setTodo(todo)} className="todo pointer">mark todo</span> : ''}
                                    {(todo.status && todo.status !== 'progress') ? <span onClick={() => this.setProgress(todo)} className="progress pointer">mark progress</span> : ''}
                                    {(todo.status && todo.status !== 'done') ? <span onClick={() => this.setDone(todo)} className="done pointer">mark done</span> : ''}
                                    <span onClick={() => this.setDelete(todo)} className="delete pointer">x delete</span>
                                </div>

                                {/* <svg className="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg> */}
                            </span>
                        ))
                    }
                </div>
            </div>
        );
    };

    setClear = () => {
        this.setState({
            id: null,
            title: '',
            tags: '',
            status: ''
        });
    }

    setEdit = (todo) => {
        this.setState({
            id: todo._id,
            title: todo.text,
            tags: todo.tags
        });
    }

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

    setTodo = async (todo) => {
        await todosStore.editItem(todo._id, {
            text: todo.text,
            tags: todo.tags,
            status: 'todo',
        }, userStore.data);
    }

    setProgress = async (todo) => {
        await todosStore.editItem(todo._id, {
            text: todo.text,
            tags: todo.tags,
            status: 'progress',
        }, userStore.data);
    }

    setDone = async (todo) => {
        await todosStore.editItem(todo._id, {
            text: todo.text,
            tags: todo.tags,
            status: 'done',
        }, userStore.data);
    }

    addTodo = async (e) => {
        e.preventDefault();

        await todosStore.addItem({
            text: this.state.title,
            tags: this.state.tags,
            status: 'todo',
        }, userStore.data);

        this.setState({
            id: null,
            title: '',
            tags: '',
            status: ''
        });
    }

    setUpdate = async (e) => {
        e.preventDefault();

        await todosStore.editItem(this.state.id, {
            text: this.state.title,
            tags: this.state.tags,
        }, userStore.data);

        this.setState({
            id: null,
            title: '',
            tags: '',
            status: ''
        });
    }

    syncTask = async () => {
        try {
            await todosStore.upload();
        } catch (err) {
            alert(err.message);
        }
    }

    setDelete = async (todo) => {
        const cek = window.confirm("Are you sure want to delete task?");

        if (cek) {
            await todosStore.deleteItem(todo._id, userStore.data);
        }
    }
}

export default List;