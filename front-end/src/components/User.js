import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Grid, Table, Button, Header, Menu, Container, Card, Image, Modal, Form } from 'semantic-ui-react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            realEstate: '',
            homeOwner: true,
            streetAddress: '',
            id: '',
            isLogin: true,
            isProperty: false,
            images: [],
            city: '',
            state: '',
            price: ''
        };

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentWillMount = () =>
    {
        if(this.props.location.state) {
            this.setState({isLogin : this.props.location.state.isLogin});
            this.setState({isProperty: this.props.location.state.isProperty});
        };
        console.log("first")
        if(localStorage.getItem("username") === null){
            localStorage.setItem("username", this.props.username);
            localStorage.setItem("password", this.props.password);
        }
    }

    componentDidMount = () => {
        let url = localStorage.getItem("username") + '/and/' + localStorage.getItem('password');
        console.log(url);
        axios.get('http://localhost:8080/api/user/' + url).then(
             (response) => {
                 this.setState({data: response.data})
                 this.setState({realEstate: response.data.realEstate});
                 if(response.data.realEstate.length === 0){
                     this.setState({homeOwner: false});
                 }
                 console.log(this.state.realEstate);
                 this.setState({id: response.data.id})
             }).catch ( (error) => {
                 console.log(error)
                });
    }

    onMenuClick = () => {
        this.props.history.push("/user");
    }


    //
    // Load the houses from the back-end
    // 
    onButtonClick = () => {
        axios.get('http://localhost:8080/api/homes/' + this.state.id).then(
            (response) => {
                console.log(JSON.stringify(response.data));
                this.setState({isProperty: true});
                this.setState({isLogin: false});
                this.setState({realEstate: response.data})
            }).catch((error) => {
                console.log(error);
            });
    }

    goHome = () => {
        this.setState({isLogin: true});
        this.setState({isProperty: false});
    }

    onHomeClick = () => {
        this.props.history.push("/");
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

    //
    //  Add new Property
    //
    handleNewProperty = (event) => {
        this.props.addNewHouse(this.state.streetAddress,
            this.state.state,
            this.state.city,
            this.state.property_type,
            this.state.price,
            this.state.id);
    }

    //
    // Handle property type.
    //
    handleType = (e, {property_type}) => {
        console.log(property_type);
        this.setState({property_type});
    }

    //
    // New Home Registration Page
    //
    handleChange = (e, data) => {
        this.setState({[e.target.name]: e.target.value});
    }

    //
    //  Deletes the property from the properties page.
    //
    handleDelete = (id) => {
        this.props.onDelete(id);
    }

    //
    // Handles the edit of the property.
    //
    handleEdit = (event, id) => {
        // this.props.onEdit(id);
        event.preventDefault();
        this.props.onEdit(this.state.streetAddress,
            this.state.state,
            this.state.city,
            this.state.property_type,
            this.state.price,
            id);

    }

    propertyPage = () => {
        var images = this.imageUrls();
        const {property_type} = this.state;
        this.state.realEstate.map(house => {
            console.log(`/images/${house.id}/${house.images}.jpg`);
        })
        // console.log(images);
        
        return(
            <div>
                <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
                    <Grid.Column style = {{ maxWidth: 900 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                        Properties
                    </Header>
                    <Grid.Row>
                    { this.state.realEstate.map(house => (
                        
                       <Card size = 'small'>
                        <Image size = 'small'
                                src=  {`/images/${house.id}/${house.images}.jpg`} />
                        <Card.Content>
                        <Card.Header>{house.streetAddress}</Card.Header>
                        <Card.Meta>{house.city}, {house.state}</Card.Meta>
                        <Card.Description>${house.price}</Card.Description>
                        </Card.Content>
                        <Button.Group>
                        <Button onClick={ () => { this.handleDelete(house.id) }}>Delete</Button>
                        <Modal trigger={<Button>Edit</Button>} size='small'>
                            <Modal.Header>Add a new house</Modal.Header>
                        <Modal.Content>
                        <Form size='small'>
                            <Form.Group>
                                <Form.Input name="streetAddress" onChange = {this.handleChange}
                                placeholder="Street Address" />
                                <Form.Input name="city" placeholder="City"
                                onChange = {this.handleChange} />
                                <Form.Input name="state" placeholder="State"
                                onChange={this.handleChange} />
                                <Form.Input name="price" placeholder ="$"
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group inline>
                                <Form.Radio
                                label='Apartment'
                                property_type = 'Apartment'
                                checked={property_type === 'Apartment'}
                                onChange={this.handleType}
                                />
                                <Form.Radio
                                label='Townhouse'
                                property_type= 'Townhouse'
                                checked={property_type === 'Townhouse'}
                                onChange={this.handleType}
                                />
                            </Form.Group>
                            <Button onClick={ (event) => 
                            this.handleEdit(event, house.id)}>Add Property</Button>
                        </Form>
                        </Modal.Content>
                        </Modal>
                        </Button.Group>
                        </Card> 
                        ))
                    } 
                    </Grid.Row>
                        <Modal trigger={<Button>Add a new House</Button>} size='small'>
                            <Modal.Header>Add a new house</Modal.Header>
                        <Modal.Content>
                        <Form size='small'>
                            <Form.Group>
                                <Form.Input name="streetAddress" onChange = {this.handleChange}
                                placeholder="Street Address" />
                                <Form.Input name="city" placeholder="City"
                                onChange = {this.handleChange} />
                                <Form.Input name="state" placeholder="State"
                                onChange={this.handleChange} />
                                <Form.Input name="price" placeholder ="$"
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group inline>
                                <Form.Radio
                                label='Apartment'
                                property_type = 'Apartment'
                                checked={property_type === 'Apartment'}
                                onChange={this.handleType}
                                />
                                <Form.Radio
                                label='Townhouse'
                                property_type= 'Townhouse'
                                checked={property_type === 'Townhouse'}
                                onChange={this.handleType}
                                />
                            </Form.Group>
                            <Button onClick={ (event) => 
                            this.handleNewProperty(event)}>Add Property</Button>
                        </Form>
                        </Modal.Content>
                        </Modal>
                    <Button onClick={this.goHome}>Back</Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    //
    // Handles Logout menu
    //
    onLogoutClick = () => {
        localStorage.clear();
        this.props.history.push("/");
    }

    userDetails = () => {
        const { property_type } = this.state;

        var view = (
            <Button icon='plus' onClick={this.onButtonClick}/>
        );

        var newProperty = (
            <Modal trigger={<Button>Add a new House</Button>} size='small'>
                            <Modal.Header>Add a new house</Modal.Header>
                        <Modal.Content>
                        <Form size='small'>
                            <Form.Group>
                                <Form.Input name="streetAddress" onChange = {this.handleChange}
                                placeholder="Street Address" />
                                <Form.Input name="city" placeholder="City"
                                onChange = {this.handleChange} />
                                <Form.Input name="state" placeholder="State"
                                onChange={this.handleChange} />
                                <Form.Input name="price" placeholder ="$"
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group inline>
                                <Form.Radio
                                label='Apartment'
                                property_type = 'Apartment'
                                checked={property_type === 'Apartment'}
                                onChange={this.handleType}
                                />
                                <Form.Radio
                                label='Townhouse'
                                property_type= 'Townhouse'
                                checked={property_type === 'Townhouse'}
                                onChange={this.handleType}
                                />
                            </Form.Group>
                            <Button onClick={ (event) => 
                            this.handleNewProperty(event)}>Add Property</Button>
                        </Form>
                        </Modal.Content>
                        </Modal>
        )
        
        return  (
            <div>
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
                     <Table.HeaderCell>View Properties</Table.HeaderCell>
                 </Table.Header>
                 <Table.Body>
                     <Table.Row>
                     <Table.Cell>{this.state.data.name}</Table.Cell>
                     <Table.Cell>{this.state.data.username}</Table.Cell>
                     <Table.Cell>{this.state.data.email}</Table.Cell>
                     <Table.Cell>
                         {
                             this.state.homeOwner ? view : newProperty
                            
                        }
                        </Table.Cell>
                     </Table.Row>
                 </Table.Body>
        </Table>
        </Grid.Column>
          </Grid>
          </div>
        );

    }
    

    render() {

        return (
            <div>
            <Menu fixed = 'top' inverted>
                    <Container>
                        <Menu.Item as='a' header onClick={this.onHomeClick}>
                            eRentHouseApplication
                        </Menu.Item>
                            <Menu.Item as='a' onClick={this.onMenuClick}>Home</Menu.Item>
                            <Menu.Item as='a' position="right" onClick={this.onLogoutClick}>Logout</Menu.Item>
                    </Container>
            </Menu>
            <div>
            {this.state.isLogin ? this.userDetails() : false}
            {this.state.isProperty ? this.propertyPage() : false}
            </div>
            </div>
        );
    }
}

export default User;