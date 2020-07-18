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
        return 'Detail'
    }
}

export default Detail;