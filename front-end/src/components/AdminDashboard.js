import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';

export class AdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: ''
        };
    }

    componentWillMount = () => {
        // this.setState({data: this.props.location.state.data});
        // console.log(JSON.stringify(this.props.location.state.data));
        axios.get("http://localhost:8080/api/user").then(
            response => {
                this.setState({data: response.data});
                console.log(this.state.data);
            });
    }


    render() {
        return (
          <div>
               {
               Array.from(this.state.data).map(user => (
                   <p>
                    Name: {user.name} Email: {user.email}<br/>
                    </p>
                ))
            }
          </div>
        );
    }
}