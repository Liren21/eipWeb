import {HomePage, ProfilePage} from '../pages';
import {withNavigationWatcher} from '../lib/contexts/navigation';

import CounterpartyFormat from "../pages/counterpartyFormats/CounterpartyFormats";
import CustomerClassifications from "../pages/customerClassifications/CustomerClassifications";
import SubcontractorClassifications from "../pages/subcontractorClassifications/SubcontractorClassifications";
import ProviderClassifications from "../pages/providerClassifications/ProviderClassifications";
import CounterpartyStatus from "../pages/counterpartyStatus/CounterpartyStatus";
import Counterparties from "../pages/counterparties/Counterparties";

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
        path: '/counterpartyFormats',
        element: CounterpartyFormat,
    },
    {
        path: '/customerClassifications',
        element: CustomerClassifications,
    },
    {
        path: '/subcontractorClassifications',
        element: SubcontractorClassifications,
    },
    {
        path: '/providerClassifications',
        element: ProviderClassifications,
    },
    {
        path: '/counterpartyStatus',
        element: CounterpartyStatus,
    },
    {
        path: '/counterparties',
        element: Counterparties,
    },
    {
        path: '/counterpartyContactPersons',
        element: Counterparties,
    },
];

export default routes.map((route) => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path),
    };
});
