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

class Detail extends BaseComponent {
    render() {
        return (
            <div className="component">
                <h2>Detail Todo</h2>
                <div className="card-list">
                    <div>title todo <span className="todo">todo</span></div>
                    <div className="tags">tags</div>
                </div>
                <br />
                <div>
                    <button className="button-grey">mark todo</button>
                    <button className="button-coral">mark progress</button>
                    <button className="button-green">mark done</button>
                </div>
            </div>
        )
    }
}

export default Detail;