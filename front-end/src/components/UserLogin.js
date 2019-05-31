import React from "react";
import axios from "axios";
import render, {Redirect} from 'react-router-dom';

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
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                    </div>
                    <form>
                        <input type="text" id="login" className="fadeIn second" name="username"
                               placeholder="Enter Username" onChange={this.handleChange} value={this.state.username}/>
                            <input type="text" id="password" className="fadeIn third" name="password"
                                   placeholder="Enter Password"
                                   onChange={ this.handleChange } value={this.state.password}/>
                                <input type="submit" className="fadeIn fourth" value="Log In"
                                onClick={ (event) => this.handleClick(event) }/>
                    </form>
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        );
    }
}
