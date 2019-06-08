import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: ''
        }
    }

    

    //
    // Handles the change in state in the user details.
    //
    handleChange = (e, data) => {
        this.setState({[e.target.name]: e.target.value});
    }

    //
    // Passes the details back to the login page.
    //
    onRegister = () => {
        this.props.registerUser(this.state.username, this.state.password,
            this.state.email, this.state.name, '0');
    }

    //
    // Handles the register button click on the Login page.
    //
    handleClick = (event) => {
        this.props.registerPage(true);
    }

    //
    // Goes back to the Login page
    //
    onBack = (event) => {
        this.props.history.push("/login");
    }


    render() {
        return(
            <Form size = 'large'>
                <Segment stacked>
                    <Form.Input fluid icon='user'
                    name = "username"
                    iconPosition='left'
                    placeholder = 'Name'
                    onChange = {this.handleChange}
                    />
                    <Form.Input
                    name = "name"
                    placeholder = 'Username'
                    onChange = {this.handleChange}
                    />
                    <Form.Input
                    name = "email"
                    placeholder = "Email"
                    onChange = {this.handleChange}
                    />
                    <Form.Input
                    name = "password"
                    placeholder = "Password"
                    type = "password"
                    onChange = {this.handleChange} />
                    <Button onClick = {this.onRegister}>Submit</Button>
                    <Button onClick = {this.onBack} floated="right">Back</Button>
                </Segment>
            </Form>
        )
    } 
}