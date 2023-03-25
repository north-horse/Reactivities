import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailSideBar from "./ActivityDetailSideBar";

export default observer (function ActivitiesDetails(){
    const {activityStore} = useStore();
    const {selectedActivity:activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(()=>{
        if (id) loadActivity(id);
    }, [id, loadActivity]);
    if (loadingInitial || !activity) return <LoadingComponent />;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailInfo activity={activity}/>
                <ActivityDetailChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSideBar />
            </Grid.Column>
        </Grid>
    )
})