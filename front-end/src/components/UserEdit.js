import React from 'react';
import { Form, Button, Grid, Header } from 'semantic-ui-react';



export class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
    
        };
    }

    //
    // Handles the form edits.
    //
    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    //
    // Go back to admin page.
    //
    handleBack = (event) => {
        event.preventDefault();
        this.props.history.push("/admindashboard");
    }

    render(){
        return (
            <Grid textAlign='center' style={{height : '80vh' }} verticalAlign='middle'>
                <Grid.Column style = {{ maxWidth: 900 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Edit Users
                    </Header>
                    <Grid.Row>
                        <Form size='small'>
                            <Form.Group>
                                <Form.Input name="name" onChange={this.handleChange}
                                placeholder = "Name"/>
                                <Form.Input name="username" placeholder="Username" onChange={this.handleChange}/>
                                <Form.Input name="password" placeholder="Password" onChange={this.handleChange}/>
                                <Form.Input name="email" placeholder="Email" onChange={this.handleChange}/>
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