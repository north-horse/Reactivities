import React, { Fragment, useEffect } from 'react';

import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';

import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/Store';
function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{marginTop:'7em'}}>
        <ActivitiesDashboard></ActivitiesDashboard>
      </Container>
    </Fragment>
  );
}

export default observer(App);
