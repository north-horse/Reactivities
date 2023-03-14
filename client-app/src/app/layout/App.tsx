import React, { Fragment, useEffect, useState } from 'react';

import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list()
    .then(response => {
      console.log(response)
      let activities: Activity[] = [];
      response.forEach(activity=>{
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  function handleSelectedActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id === id));
  }
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleChangeActivity(activity:Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x=>x.id!==activity.id), activity]) 
        setSelectedActivity(activity)
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !== id)])
      setSelectedActivity(undefined)
      setSubmitting(false);
    })
  }
  if (loading) return <LoadingComponent content='Loading app'/>
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}></NavBar>
      <Container style={{marginTop:'7em'}}>
        <ActivitiesDashboard 
            activities={activities} 
            selectedActivity={selectedActivity} 
            selectActivity={handleSelectedActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            changeActivity={handleChangeActivity}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}></ActivitiesDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
