import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import ActivitiesFilter from "./ActivitiesFilter";
import ActivitiesList from "./ActivitiesList";

export default observer(function ActivitiesDashboard(){
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry])
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivitiesList></ActivitiesList>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivitiesFilter></ActivitiesFilter>
            </Grid.Column>
        </Grid>
    )
})