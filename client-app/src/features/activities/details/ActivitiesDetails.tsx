import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardDescription, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";

export default observer (function ActivitiesDetails(){
    const {activityStore} = useStore();
    const {selectedActivity:activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(()=>{
        if (id) loadActivity(id);
    }, [id, loadActivity]);
    if (loadingInitial || !activity) return <LoadingComponent />;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <CardDescription>{activity.description}</CardDescription>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit'></Button>
                    <Button as={Link} to='/activities' basic color="grey" content='Cancel'></Button>

                </Button.Group>
            </Card.Content>
        </Card>
    )
})