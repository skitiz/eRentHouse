import React from 'react';
import { Header, Form, Segment, Button, Grid } from 'semantic-ui-react'

export class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    //
    //  Captures values from the form login for admin
    //
    handleChange = (e, data) => {
        this.setState({[e.target.name]: e.target.value});
    };

    //
    //  Sends value back to App.js for evaluation and admin login.
    //
    handleClick = (event) => {
        this.props.adminLogin(this.state.username, this.state.password)
    }


    render() {

        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style = {{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Admin Login
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
                            </Button.Group>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}