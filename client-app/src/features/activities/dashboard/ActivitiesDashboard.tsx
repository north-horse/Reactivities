import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivitiesDetails from "../details/ActivitiesDetails";
import ActivityForm from "../form/ActivityForm";
import ActivitiesList from "./ActivitiesList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id:string)=>void;
    cancelSelectActivity: () =>void;
    editMode: boolean;
    openForm: (id:string)=>void;
    closeForm: ()=>void;
    changeActivity: (activity: Activity) => void;
    deleteActivity: (id:string) => void;
}
export default function ActivitiesDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, changeActivity, deleteActivity}:Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivitiesList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}></ActivitiesList>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivitiesDetails activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                ></ActivitiesDetails>}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} changeActivity={changeActivity}/>}
            </Grid.Column>
        </Grid>
    )
}