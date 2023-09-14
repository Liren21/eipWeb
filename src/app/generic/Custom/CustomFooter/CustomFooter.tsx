import {Routes, Route, Navigate} from 'react-router-dom';

import routes from '../../../components/App/app-routes';
import {SideNavOuterToolbar as SideNavBarLayout} from '../../../../core/components/layouts';

import appInfo from "../../../components/App/app-info";
import Footer from '../../../../core/components/footer/Footer';

export default function CustomFooter() {
    return (
        <SideNavBarLayout title={appInfo.title}>
            <Routes>
                {routes.map(({path, element}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
                <Route path='*' element={<Navigate to='/home'/>}/>
            </Routes>
        </SideNavBarLayout>
    );
}

