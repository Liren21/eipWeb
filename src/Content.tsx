import { Routes, Route, Navigate } from 'react-router-dom';
import appInfo from './components/App/app-info';
import routes from './components/App/app-routes';
import { SideNavOuterToolbar as SideNavBarLayout } from './lib/layouts';
import { Footer } from './components/imports';

export default function Content() {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element}/>
        ))}
        <Route path='*' element={<Navigate to='/home' />}/>
      </Routes>
      <Footer>
        Copyright © 2011-{new Date().getFullYear()} {appInfo.title} Inc.
        <br />
        All trademarks or registered trademarks are property of their
        respective owners.
      </Footer>
    </SideNavBarLayout>
  );
}
