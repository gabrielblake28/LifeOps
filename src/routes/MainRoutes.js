import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import SettingsPage from 'pages/settings/settings-page';
import FeedbackPage from 'pages/feedback/feedback-page';
// import TermsPage from 'pages/extra-pages/TermsPage';
import EpicsPage from 'pages/epics/epics-page';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'settings-page',
      element: <SettingsPage />
    },
    {
      path: 'feedback-page',
      element: <FeedbackPage />
    },
    {
      path: 'epics-page',
      element: <EpicsPage />
    }
    // {
    //   path: 'terms-page',
    //   element: <TermsPage />
    // },
  ]
};

export default MainRoutes;
