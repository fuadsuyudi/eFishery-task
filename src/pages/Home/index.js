import React from 'react';
import userStore from '../../store/user';
import todosStore from '../../store/todos';

import logo from '../../logo.svg';

class BaseComponent extends React.PureComponent {
    rerender = () => {
        this.setState({
            _rerender: new Date(),
        });
    }
}

class Home extends BaseComponent {
    state = {
        title: '',
        tags: '',
        status: ''
    }

    logout = async () => {
        await todosStore.deinitialize();
        await userStore.deleteSingle();

        window.location.reload();
    }

    componentDidMount() {
        this.unsubTodos = todosStore.subscribe(this.rerender);
    }

    render() {
        return (
            <div>
                <div className="toolbar" role="banner">
                    <img className="App-logo" width="40" alt="React Logo" src={logo} />
                    <span>ToDos</span>

                    <div class="spacer"></div>
                    <span>{userStore.data.email}</span>
                    <svg onClick={this.logout} class="material-icons mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#1976d2" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                </div>

                <div className="content" role="main">

                    <div class="card-container">
                        <form onSubmit={this.addTodo}>
                            <p><input placeholder="Todo Title" type='text' value={this.state.title} onChange={this.setTitle} /></p>
                            <p><input placeholder="Todo Tags (Separate with , for more tags)" type='text' value={this.state.tags} onChange={this.setTags} /></p>
                            <p><button>Add New</button></p>
                        </form>
                    </div>

                    <div class="card-container">
                        {
                            todosStore.data.map((todo, index) => (
                                <span class="card" key={todo._id}>
                                    <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>

                                    <div className="card-list">
                                        <div>{todo.text} <span className={todo.status}>{todo.status}</span></div>
                                        <div className="tags">{(todo.tags) ? todo.tags : '-'}</div>
                                    </div>

                                    <div class="spacer"></div>
                                    <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
                                </span>
                            ))
                        }
                    </div>

                    <svg id="clouds" alt="Gray Clouds Background" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">
                        <path id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee" />
                    </svg>
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

export default Home;