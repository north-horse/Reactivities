import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import ActivitiesDetails from "../details/ActivitiesDetails";
import ActivityForm from "../form/ActivityForm";
import ActivitiesList from "./ActivitiesList";

export default observer(function ActivitiesDashboard(){
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivitiesList></ActivitiesList>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivitiesDetails></ActivitiesDetails>}
                {editMode &&
                <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
})