import 'devextreme/dist/css/dx.common.css';
import '../../../themes/generated/theme.base.css';
import '../../../themes/generated/theme.additional.css';
import {HashRouter as Router} from 'react-router-dom';
import '../../../dx-styles.scss';
import LoadPanel from 'devextreme-react/load-panel';
import {NavigationProvider} from '../../../core/lib/contexts/navigation';
import {AuthProvider, useAuth} from '../../../core/lib/contexts/auth';
import CustomFooter from '../../generic/Custom/CustomFooter/CustomFooter';
import UnauthenticatedContent from '../pages/UnauthenticatedContent/UnauthenticatedContent';

function App() {
    const {user, loading} = useAuth();

    if (loading) {
        return <LoadPanel visible={true}/>;
    }

    if (user) {
        return <CustomFooter/>;
    }

    return <UnauthenticatedContent/>;
}

export default function Root() {
    // const screenSizeClass = useScreenSizeClass();

    return (
        <Router>
            <AuthProvider>
                <NavigationProvider>
                    <App/>
                </NavigationProvider>
            </AuthProvider>
        </Router>
    );
}
