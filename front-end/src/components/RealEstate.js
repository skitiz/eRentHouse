import React from 'react';
import { Button } from 'semantic-ui-react';

export class RealEstate extends React.Component {
    constructor(props) {
        super(props);
        state = {

        };
    }

    onLoad = () => {
        
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
                <Header as='h2' color='red' textAlign='center'>
                    Properties
                </Header>
            </Grid.Column>
        </Grid>
        </div>
        );
    }

    render(){
        return(
            <Button onClick={this.onLoad}>View Properties</Button>
        );
    }
}