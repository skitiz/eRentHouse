import React from 'react';
import axios from 'axios';

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount = () =>
    {
        let url = this.props.username + '/and/' + this.props.password;
        axios.get('http://localhost:8080/api/user/' + url).then(
             (response) => {
                 this.setState({data: response.data})
             }).catch ( (error) => {
                 console.log(error.response.data)
                });
    }

    render() {
        return (
          <div>
                <h2> I'm here </h2>
          </div>
        );
    }
}
