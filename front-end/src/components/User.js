import React from 'react';
import axios from 'axios';
import { Grid, Table, Button, Header, Menu, Container } from 'semantic-ui-react';

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            realEstate: '',
            homeOwner: ''
        };
    }

    componentDidMount = () =>
    {
        let url = this.props.username + '/and/' + this.props.password;
        axios.get('http://localhost:8080/api/user/' + url).then(
             (response) => {
                 this.setState({data: response.data})
                 this.setState({realEstate: response.data.realEstate});
                 if(response.data.type === 0){
                     this.setState({homeOwner: 'True'});
                 }
                 console.log(this.state.realEstate);
                 let result = this.state.realEstate.map( a => a.streetAddress);
                 this.setState({realEstate: result});
             }).catch ( (error) => {
                 console.log(error)
                });
    }

    onMenuClick = () => {
        this.props.history.push("/user");
    }

    render() {

        return (
            <div>
        <Menu fixed = 'top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            eRentHouseApplication
                        </Menu.Item>
                            <Menu.Item as='a' onClick={this.onMenuClick}>Home</Menu.Item>
                    </Container>
        </Menu>
          <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
              <Grid.Column style = {{ maxWidth: 900 }}>
              <Header as='h2' color='teal' textAlign='center'>
                        User Details
                    </Header>
            <Table celled inverted>
                 <Table.Header>
                     <Table.HeaderCell>Name</Table.HeaderCell>
                     <Table.HeaderCell>Username</Table.HeaderCell>
                     <Table.HeaderCell>Email</Table.HeaderCell>
                     <Table.HeaderCell>Owns Home?</Table.HeaderCell>
                     <Table.HeaderCell>View Properties</Table.HeaderCell>
                 </Table.Header>
                 <Table.Body>
                     <Table.Row>
                     <Table.Cell>{this.state.data.name}</Table.Cell>
                     <Table.Cell>{this.state.data.username}</Table.Cell>
                     <Table.Cell>{this.state.data.email}</Table.Cell>
                     <Table.Cell>{this.state.homeOwner}</Table.Cell>
                     <Table.Cell> <Button icon='plus'></Button></Table.Cell>
                     </Table.Row>
                 </Table.Body>
        </Table>
        </Grid.Column>
          </Grid>
          </div>
        );
    }
}
