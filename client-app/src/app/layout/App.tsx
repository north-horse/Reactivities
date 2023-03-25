
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';

import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivitiesDetails from '../../features/activities/details/ActivitiesDetails';
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{marginTop:'7em'}}>
            <Routes>
              {/* <Route path="/" element={<HomePage/>}/> */}
              <Route path="/activities" element={<ActivitiesDashboard/>}/>
              <Route path='/activities/:id' element={<ActivitiesDetails/>} />
              <Route path="/createActivity" element={<ActivityForm key='create'/>}/>
              <Route path="/manage/:id" element={<ActivityForm key='manage' />} />
            </Routes>
          </Container>
        </>
      )}

    </>
  );
}

export default observer(App);
