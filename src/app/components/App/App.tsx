import 'devextreme/dist/css/dx.common.css';
import '../../../themes/generated/theme.base.css';
import '../../../themes/generated/theme.additional.css';
import {HashRouter as Router} from 'react-router-dom';
import '../../../dx-styles.scss';
import LoadPanel from 'devextreme-react/load-panel';
import {NavigationProvider} from '../lib/contexts/navigation';
import {AuthProvider, useAuth} from '../lib/contexts/auth';
import Content from '../../../Content';
import UnauthenticatedContent from '../../../UnauthenticatedContent';
import {useEffect} from "react";
import {fetchData} from "../lib/store/slices/dataSlice";
import {useAppDispatch} from "../lib/hooks/hooks";
import {fetchEmployee} from "../lib/store/slices/employeeSlice";
import {fetchSignStates} from "../lib/store/slices/stateSlice";
import {fetchConsumers} from "../lib/store/slices/consumerSlice";
import {fetchContractTypes} from "../lib/store/slices/contractTypesSlice";

function App() {
    const {user, loading} = useAuth();

    if (loading) {
        return <LoadPanel visible={true}/>;
    }

    if (user) {
        return <Content/>;
    }

    return <UnauthenticatedContent/>;
}

export default function Root() {
    // const screenSizeClass = useScreenSizeClass();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchEmployee());
        dispatch(fetchSignStates());
        dispatch(fetchConsumers());
        dispatch(fetchContractTypes());
    }, [dispatch])
    return (
        <Router>
            <AuthProvider>
                <NavigationProvider>
                    {/*<div className={`app`}>*/}
                    <App/>
                    {/*</div>*/}
                </NavigationProvider>
            </AuthProvider>
        </Router>
    );
}
