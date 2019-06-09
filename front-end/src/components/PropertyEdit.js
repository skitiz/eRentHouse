import React from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';

export class PropertyEdit extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            streetAddress: '',
            id: '',
            city: '',
            state: '',
            price: ''
        };
    }

    componentWillMount = () => {
        if(this.props.location.state){
            this.setState({ id: this.props.location.state.id});
        }
    }

    //
    // Handles the form edits.
    //
    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    //
    // Handles property type.
    //
    handleType = (e, {property_type}) => {
        console.log(property_type);
        this.setState({property_type});
    }

    //
    // Handles the edit of the property.
    //
    handleEdit = (event) => {
        event.preventDefault();
        this.props.onEdit(this.state.streetAddress,
            this.state.state,
            this.state.city,
            this.state.property_type,
            this.state.price,
            this.state.id);
    }

    //
    // Go back to admin page.
    //
    handleBack = (event) => {
        event.preventDefault();
        this.props.history.push("/admindashboard");
    }

    render() {
        const { property_type } = this.state;
        return(
            <Grid textAlign='center' style={{height : '80vh' }} verticalAlign='middle'>
                <Grid.Column style = {{ maxWidth: 900 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Edit Real Estate
                    </Header>
                    <Grid.Row>
                        <Form size='small'>
                            <Form.Group>
                                <Form.Input name="streetAddress" onChange={this.handleChange}
                                placeholder = "Street Address"/>
                                <Form.Input name="city" placeholder="City" onChange={this.handleChange}/>
                                <Form.Input name="state" placeholder="State" onChange={this.handleChange}/>
                                <Form.Input name="price" placeholder="$" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group inline>
                                <Form.Radio
                                label='Apartment'
                                property_type = 'Apartment'
                                checked = {property_type === 'Apartment'}
                                onChange={this.handleType}
                                />
                                <Form.Radio
                                label='Townhouse'
                                property_type = 'Townhouse'
                                checked = {property_type === 'Townhouse'}
                                onChange={this.handleType}
                                />
                            </Form.Group>
                            <Button.Group>
                            <Button onClick = { (event) => this.handleEdit(event)}>
                                Edit
                            </Button>
                            <Button onClick = { (event) => this.handleBack(event)}>
                                Back
                            </Button>
                            </Button.Group>
                        </Form>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}