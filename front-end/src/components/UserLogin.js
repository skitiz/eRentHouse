import React from "react";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

export class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toUserDetails: false,
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, data) => {
        // this.setState({value})
        this.setState({[e.target.name]: e.target.value});
    };

    

    handleClick = (event) => {
        event.preventDefault(); 
        this.props.onLogin(this.state.username, this.state.password);
    };


    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style = {{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Login To Your Account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user'  
                            name="username"
                            iconPosition='left' 
                            placeholder='Username'
                            onChange={this.handleChange}
                            // value = {value}
                             />
                            <Form.Input
                                fluid
                                name="password"
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
                                // value = {value}
                                />
                            <Button.Group>
                                <Button onClick={ (event) => this.handleClick(event) }>Login</Button>
                                <Button.Or />
                                <Button positive>Register</Button>
                            </Button.Group>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}
