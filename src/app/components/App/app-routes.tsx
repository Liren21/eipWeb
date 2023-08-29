import {withNavigationWatcher} from '../lib/contexts/navigation';

import {CustomerClassifications} from "../pages/customerClassifications/CustomerClassifications";
import {SubcontractorClassifications} from "../pages/subcontractorClassifications/SubcontractorClassifications";
import {ProviderClassifications} from "../pages/providerClassifications/ProviderClassifications";
import {CounterpartyStatus} from "../pages/counterpartyStatus/CounterpartyStatus";
import {Counterparties} from "../pages/counterparties/Counterparties";

import {Profile} from "../pages/profile/Profile";
import {Home} from "../pages/home/Home";
import {CounterpartyFormats} from "../pages/counterpartyFormats/CounterpartyFormats";
import {CounterpartyContactPersons} from "../pages/counterpartyContactPersons/CounterpartyContactPersons";

const routes = [
    {
        path: '/profile',
        element: Profile,
    },
    {
        path: '/home',
        element: Home,
    },
    {
        path: '/counterpartyFormats',
        element: CounterpartyFormats,
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
        element: CounterpartyContactPersons,
    },
];

export default routes.map((route) => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path),
    };
});
