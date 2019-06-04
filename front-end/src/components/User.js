import React from 'react';
import axios from 'axios';
import { Grid, Table, Button, Header, Menu, Container, Card, Image } from 'semantic-ui-react';

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            realEstate: '',
            homeOwner: '',
            id: '',
            isLogin: true,
            isProperty: false,
            images: []
        };

        this.onButtonClick = this.onButtonClick.bind(this);
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
                 this.setState({id: response.data.id})
             }).catch ( (error) => {
                 console.log(error)
                });
    }

    onMenuClick = () => {
        this.props.history.push("/user");
    }

    onButtonClick = () => {
        axios.get('http://localhost:8080/api/homes/' + this.state.id).then(
            (response) => {
                console.log(response.data);
                this.setState({isProperty: true});
                this.setState({isLogin: false});
            }).catch((error) => {
                console.log(error);
            });
    }

    goHome = () => {
        this.setState({isLogin: true});
        this.setState({isProperty: false});
    }


    imageUrls = () => {
        let url = "/images/" + this.state.id + "/";
        let result = this.state.data.realEstate.map(a => a.images);
        var arr = result[0].map( add => url + add + '.jpg');
        let temp = [];
        Array.from(arr).forEach(child => {
            temp.push(child);
        })
        console.log(temp);
        return temp;
    }


    propertyPage = () => {
        var images = this.imageUrls();
        console.log(images);
        
        return(
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
                        Properties
                    </Header>
                    <div>
                    { images.map(image => (
                       <Card>
                        <Image floated = 'right' size = 'small'
                                src= {image}/>
                        <Card.Content>
                        <Card.Header>{this.state.realEstate}</Card.Header>
                        </Card.Content>
                        </Card> 
                        ))
                    } 
                        </div>
                    <Button onClick={this.goHome}>Back</Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    render() {
        var userdetails = (
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
                     <Table.Cell><Button icon='plus' onClick={this.onButtonClick}/></Table.Cell>
                     </Table.Row>
                 </Table.Body>
        </Table>
        </Grid.Column>
          </Grid>
          </div>
        );

        return (
            <div>
            {this.state.isLogin ? userdetails : false}
            {this.state.isProperty ? this.propertyPage() : false}
            </div>
        );
    }
}
