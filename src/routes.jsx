/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { DashboardLayout, ErrorLayout } from 'layouts';

import PresentationView from 'views/Presentation';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/overview" />,
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404')),
      },

      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/overview',
        exact: true,
        component: lazy(() => import('views/Overview')),
      },
      {
        path: '/management/users',
        exact: true,
        component: lazy(() => import('views/UserManagement')),
      },
      {
        path: '/management/drivers',
        exact: true,
        component: lazy(() => import('views/DriverManagement')),
      },
      {
        path: '/management/routes',
        exact: true,
        component: lazy(() => import('views/RouteManagement')),
      },
      {
        path: '/management/schedules',
        exact: true,
        component: lazy(() => import('views/ScheduleManagement')),
      },
      {
        path: '/presentation',
        exact: true,
        component: PresentationView,
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];

export default routes;
