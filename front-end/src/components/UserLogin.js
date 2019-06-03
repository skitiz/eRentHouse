import React from "react";
import axios from "axios";
import render, {Redirect} from 'react-router-dom';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import FormItem from "antd/lib/form/FormItem";

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

    handleChange = ({target}) => {
        this.setState( {[target.name]: target.value });
    };

    

    handleClick = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password);
    };


    render() {
        return (
            // <div className="wrapper fadeInDown">
            //     <div id="formContent">
            //         <div className="fadeIn first">
            //         </div>
            //         <form>
            //             <input type="text" id="login" className="fadeIn second" name="username"
            //                    placeholder="Enter Username" onChange={this.handleChange} value={this.state.username}/>
            //                 <input type="text" id="password" className="fadeIn third" name="password"
            //                        placeholder="Enter Password"
            //                        onChange={ this.handleChange } value={this.state.password}/>
            //                     <input type="submit" className="fadeIn fourth" value="Log In"
            //                     onClick={ (event) => this.handleClick(event) }/>
            //         </form>
            //         <div id="formFooter">
            //             <a className="underlineHover" href="#">Forgot Password?</a>
            //         </div>
            //     </div>
            // </div>

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style = {{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Login To Your Account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' 
                            iconPosition='left' 
                            placeholder='Username'
                            onChange={this.handleChange} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
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
