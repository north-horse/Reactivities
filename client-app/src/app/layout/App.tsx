import React, { Fragment, useEffect, useState } from 'react';

import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      console.log(response)
      setActivities(response.data)
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
    activity.id ? setActivities([...activities.filter(x=>x.id!==activity.id), activity]) : setActivities([...activities, {...activity, id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !== id)])
    setSelectedActivity(undefined)
  }
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
            deleteActivity={handleDeleteActivity}></ActivitiesDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
