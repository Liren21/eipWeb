import {HomePage, ProfilePage} from '../pages';
import {withNavigationWatcher} from '../lib/contexts/navigation';
import Test from "../pages/test/Test";

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
        path: '/test',
        element: Test,
    },
];

export default routes.map((route) => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path),
    };
});
