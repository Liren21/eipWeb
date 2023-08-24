import {HomePage, ProfilePage} from '../pages';
import {withNavigationWatcher} from '../lib/contexts/navigation';
import CounterpartyContactPerson from "../pages/сounterpartyContactPerson/CounterpartyContactPerson";

const routes = [
    {
        path: '/profile',
        element: ProfilePage,
    },
    {
        path: '/home',
        element: HomePage,
    },
    {
        path: '/сounterpartyContactPerson',
        element: CounterpartyContactPerson,
    },
];

export default routes.map((route) => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path),
    };
});
