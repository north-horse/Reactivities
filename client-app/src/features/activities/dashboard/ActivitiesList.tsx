import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import ActivitiesListItem from "./ActivitiesListItem";

export default observer(function ActivitiesList(){
    const {activityStore} = useStore();
    
    const {groupedActivities} = activityStore;
    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                <Header sub color="teal">
                    {group}
                </Header>
                <Segment>
                    {activities.map(activity=>(
                        <ActivitiesListItem key={activity.id} activity={activity}></ActivitiesListItem>
                    ))}
                </Segment>
                </Fragment>
            ))}
        </>

    )
})