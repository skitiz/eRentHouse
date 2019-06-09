import React from 'react';
import './App.css';
import {UserLogin} from './components/UserLogin';
import {Route, Switch, withRouter} from "react-router-dom";
import User from "./components/User";
// import {getCurrentUser} from './components/Functions'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Register } from './components/Register'
import { Admin } from './components/Admin'
import {LandingPage} from './components/LandingPage'
import { AdminDashboard } from './components/AdminDashboard';
import { PropertyEdit } from './components/PropertyEdit';
import { UserEdit } from './components/UserEdit';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser : null,
            isAuthenticated: false,
            isLoading: false,
            username: null,
            password: null
        }

        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        // this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser(username, password) {
        this.setState({
            isLoading: true,
            username: username,
            password: password
        })

        // getCurrentUser(username, password).then( (response) => {
        //     this.setState({
        //         currentUser: response[0],
        //         isAuthenticated: true,
        //         isLoading: true
        //     });
        // }).catch( error => {
        //     this.setState({
        //         isLoading: false
        //     });
        // });


        let url = username + '/and/' + password;
        axios.get('http://localhost:8080/api/user/' + url).then(
             (response) => {
                 this.setState({data: response.data});
                 this.setState({isAuthenticated: true});
             }).catch ((error) => {
                 console.log(error)
                });
    }


    // Callback function.
    handleLogin = (username, password) => {
        this.loadCurrentUser(username, password);
        this.props.history.push({
            pathname: "/user",
        state: {
            isLogin: true,
            isProperty: false
        }});
    };


    onMenuClick = () => {
        this.props.history.push("/user");
    };

    //
    // Handles registration of the user.
    //
    handleRegister = (username, password, email, name, ho) => {
        
        axios.post('http://localhost:8080/api/user', {
            name: name,
            username: username,
            email: email,
            password: password,
            type: ho
        }).then( response => {
            console.log(response);
            this.setState({username: username});
            this.setState({password: password});
            this.props.history.push({
                pathname: "/user",
            state: {isLogin: true, isProperty: false}});

        }).catch(error => {
            console.log(error);
        })
    }

    //
    // Gets data from admin login page and lets admins login.
    //
    isAdmin = (username, password) => {
        if(username === 'x' && password === 'x') {
            let url = username + '/and/' + password;
            console.log(url);
        axios.get('http://localhost:8080/api/user/' + url).then(
            response => {
                console.log(response.data);
                axios.get('http://localhost:8080/api/user').then(
                    response => {
                        this.props.history.push({
                            pathname: "/admindashboard",
                            state: {data: response.data}});
                    }
                )
            })
            .catch( error => {
                alert('Invalid login credentials for admin.')
                console.log(error.response);
            });
        }
        else {
            alert('Invalid credentials');
        }
        
    }

    //
    // Create a new house
    //
    handleNewHome = (streetAddress, state, city, property_type, price, id) => {
        axios.post('http://localhost:8080/api/homes/' + id, {
            streetAddress: streetAddress,
            state: state,
            city: city,
            property_type: property_type,
            price: price
        }).then( response => {
            let post_id = response.data.id;
            axios.post("http://localhost:8080/api/" + id + "/homes/" + post_id).then(
                response => {
                    alert("Successfully added a new house.")
                    this.props.history.push({
                        pathname: "/user",
                        state: { isLogin: true, isProperty: false}
                    })
                }
            ).catch(
                error => {
                    console.log(error.response);
                    alert("Could not add property.");
                }
            )
        })
    }

    //
    // Deletes the property from the user.
    //
    didDeleteProperty = (id) => {
        console.log("http://localhost:8080/api/homes/" + id);
        axios.delete("http://localhost:8080/api/homes/" + id)
        .then(response => {
            console.log("successfully deleted");
            window.location.reload();
        })
    }

    //
    // Did edit property.
    //
    didEditProperty = (streetAddress,
        state,
        city,
        property_type,
        price,
        id) => {
        axios.put('http://localhost:8080/api/homes/' + id, {
            streetAddress: streetAddress,
            state: state,
            city: city,
            property_type: property_type,
            price: price
        }).then( response => {
            console.log("Property edited.");
        })
    }

    //
    // Delete the user.
    //
    didUserDelete = (id) => {
        axios.delete('http://localhost:8080/api/user/' + id).then(
            response => {
                console.log("Successfully deleted.");
                window.location.reload();
            }
        )
    }


    render() {
        return (
            <div>
                <Container>
                <Switch>
                    <Route exact path= "/"
                    render = {
                        (props) => <LandingPage {...props}/>
                    }>
                    </Route>
                    <Route path="/login"
                    render = 
                    {(props) => <UserLogin onLogin={this.handleLogin}  onRegister = 
                    {this.handleRegister}  {...props} />}>
                    </Route>
                    <Route path="/user" render = {
                        (props) => <User username={this.state.username} password={this.state.password}
                        addNewHouse = {this.handleNewHome}
                        onDelete = {this.didDeleteProperty}
                        onEdit = {this.didEditProperty}
                        {...props}/>
                    }>
                    </Route>
                    <Route path ="/register" render= {
                        (props) => <Register registerUser={this.handleRegister} {...props}/>
                    }></Route>
                    <Route path ="/admin" render = {
                            (props) => <Admin adminLogin = {this.isAdmin} {...props} />
                    }></Route>
                    <Route path ="/admindashboard" render = {
                            (props) => <AdminDashboard 
                            onUserDelete={this.didUserDelete}
                            onDelete={this.didDeleteProperty} {...props} />
                    }></Route>
                    <Route path = "/editProperty" render = {
                        (props) => <PropertyEdit onEdit = {this.didEditProperty}
                        {...props} />
                    }></Route>
                    <Route path = "/editUser" render = {
                        (props) => <UserEdit onUserEdit = {this.didEditUser}
                        {...props}/>
                    }></Route>
                </Switch>
                </Container>
                </div>
                
        );
    }
}

export default withRouter(App);
