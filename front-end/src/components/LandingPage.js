import React from 'react';
import { Button, Container, Header, Menu, Segment } from 'semantic-ui-react'

export class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleLogin = (event) => {
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="App">
            <Segment inverted vertical textAlign= "center">
                <Container as='nav'>
                    <Header inverted as='h1'>
                        eRentHouse Application
                    </Header>
                    <Menu borderless compact inverted>
                        <Menu.Item active>Home</Menu.Item>
                        <Menu.Item>Browse</Menu.Item>
                        <Menu.Item onClick={this.handleLogin}>Login</Menu.Item>
                    </Menu>
                </Container>
                <Container className="content">
                    <Header inverted as="h1">
                        Find and list houses.
                    </Header>
                    <p>
                        eRentHouse is a website which lets users list properties and other users to buy them.
                    </p>
                </Container>
                <Segment inverted vertical as="footer">
                    A website for <a href="www.eRentHouse.com">eRentHouse</a>, by{" "}
                    <a href="http://github.com/skitiz/erenthouse">skitiz</a>
                    .
                </Segment>
            </Segment>
            </div>
        );
    }
}