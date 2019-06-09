import React from 'react';
import { Grid, Table, Header, Button, Menu, Container } from 'semantic-ui-react';
import axios from 'axios';

export class AdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            properties: ''
        };
    }

    componentWillMount = () => {
        // this.setState({data: this.props.location.state.data});
        // console.log(JSON.stringify(this.props.location.state.data));
        axios.get("http://localhost:8080/api/user").then(
            response => {
                this.setState({data: response.data});
                console.log(this.state.users);
            });

        axios.get('http://localhost:8080/api/homes').then(
            response => {
                this.setState({properties: response.data});
                console.log(this.state.properties);
            }
        )
        
    }

    //
    // Handles User edit.
    //
    onUserEdit = (id) => {
        this.props.history.push({
            pathname: "/editUser",
            state: {id: id}});
    }

    //
    // Handles deletion of user.
    //
    onUserDelete = (id) => {
        console.log("this is called everytime.");
        this.props.onUserDelete(id);
    }

    //
    // Handles property edit.
    //
    onPropertyEdit = (id) => {
        this.props.history.push({
            pathname: "/editProperty",
            state: {id: id}});
    }

    //
    // Handles deletion of property.
    //
    onPropertyDelete = (id) => {
        this.props.onDelete(id);
    }

    //
    // Logs the admin out.
    //
    redirectHome = () => {
        this.props.history.push("/");
    }


    render() {
        return (
            <div>
            <Menu fixed = 'top' inverted>
                <Container>
                    <Menu.Item as='a' position='right' onClick={this.redirectHome}>Logout</Menu.Item>
                </Container>
            </Menu>
              <Grid textAlign='center' style= {{ height: '100vh' }} verticalAlign = 'middle'>
                  <Grid.Column style = {{ maxWidth: 900 }}>
                      <Header as='h2' color='teal' textAlign='center'>
                            Users
                        </Header>
                        <Container>
                        <Table celled inverted textAlign='center'>
                            <Table.Header>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Username</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Properties</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                            {
                                Array.from(this.state.data).map(user => (
                                    <Table.Row>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>{ (user.type === 0) ? user.realEstate.length : 0 }</Table.Cell>
                                        <Table.Cell><Button icon='plus' onClick={() => {this.onUserEdit(user.id)}}/></Table.Cell>
                                        <Table.Cell><Button icon='plus' onClick={() => {this.onUserDelete(user.id)}}/></Table.Cell>
                                    </Table.Row>
                                ))
                            }
                            </Table.Body>
                        </Table>
                        <Header as='h2' color='teal' textAlign='center'>
                            Properties
                        </Header>
                        <Table celled inverted textAlign='center'>
                            <Table.Header>
                                <Table.HeaderCell>Street Address</Table.HeaderCell>
                                <Table.HeaderCell>State</Table.HeaderCell>
                                <Table.HeaderCell>City</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                                {
                                    Array.from(this.state.properties).map( house => (
                                        <Table.Row>
                                            <Table.Cell>{house.streetAddress}</Table.Cell>
                                            <Table.Cell>{house.state}</Table.Cell>
                                            <Table.Cell>{house.city}</Table.Cell>
                                            <Table.Cell>{house.price}</Table.Cell>
                                            <Table.Cell><Button icon='plus' onClick={() => {this.onPropertyEdit(house.id)}}/></Table.Cell>
                                            <Table.Cell><Button icon='plus' onClick={() => {this.onPropertyDelete(house.id)}}/></Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                        </Container>
                </Grid.Column>
            </Grid>
          </div>
        );
    }
}