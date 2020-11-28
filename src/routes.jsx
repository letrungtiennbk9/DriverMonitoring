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
    component: () => <Redirect to="/presentation" />,
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
        path: '/presentation',
        exact: true,
        component: PresentationView,
      },
    ],
  },
];

export default routes;
