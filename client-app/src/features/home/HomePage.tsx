import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return (
        <Segment inverted vertical textAlign="center" className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to ReActivities'>

                </Header>
                <Button as={Link} to='/activities' size="huge" inverted>Take Me to the Activities</Button>
            </Container>
        </Segment>
    )
}