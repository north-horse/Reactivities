import React from "react";
import { Button, Card, CardDescription, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";

export default function ActivitiesDetails(){
    const {activityStore} = useStore();
    const {selectedActivity:activity, openForm, cancelSelectedActivity} = activityStore;

    if (!activity) return <LoadingComponent />;
    return (
        <Card>
            <Image src={`assets/categoryImages/${activity.category}.jpg`}></Image>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <CardDescription>{activity.description}</CardDescription>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={()=>openForm(activity.id)} basic color="blue" content='Edit'></Button>
                    <Button onClick={cancelSelectedActivity} basic color="grey" content='Cancel'></Button>

                </Button.Group>
            </Card.Content>
        </Card>
    )
}