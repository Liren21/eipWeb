import {withNavigationWatcher} from '../../../core/lib/contexts/navigation';
import {CustomerClassifications} from "../pages/customerClassifications/CustomerClassifications";
import {SubcontractorClassifications} from "../pages/subcontractorClassifications/SubcontractorClassifications";
import {ProviderClassifications} from "../pages/providerClassifications/ProviderClassifications";
import {CounterpartyStatus} from "../pages/counterpartyStatus/CounterpartyStatus";
import {Counterparties} from "../pages/counterparties/Counterparties";
import {Profile} from "../pages/profile/Profile";
import {Home} from "../home/Home";
import {CounterpartyFormats} from "../pages/counterpartyFormats/CounterpartyFormats";
import {CounterpartyContactPersons} from "../pages/counterpartyContactPersons/CounterpartyContactPersons";
import {Contracts} from "../pages/contracts/Contracts";
import {ContractCategories} from "../pages/contractCategories/ContractCategories";
import {Rases} from "../pages/rases/Rases";
import {StatusDOs} from "../pages/statusDOs/StatusDOs";
import {Employees} from "../pages/employees/Employees";
import Test from "../pages/Test/Test";

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
    {
        path: '/contractCategories',
        element: ContractCategories,
    },
    {
        path: '/contracts',
        element: Contracts,
    },
    {
        path: '/rases',
        element: Rases,
    },
    {
        path: '/statusDOs',
        element: StatusDOs,
    },
    {
        path: '/employees',
        element: Employees,
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
