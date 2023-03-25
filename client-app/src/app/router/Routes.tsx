import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import ActivitiesDetails from "../../features/activities/details/ActivitiesDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";

export const routes:RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivitiesDashboard />},
            {path: 'activities/:id', element: <ActivitiesDetails />},
            {path: 'createActivity', element: <ActivityForm />}
        ]
    }
]
export const router = createBrowserRouter(routes);