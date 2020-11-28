import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'components/t';
import ErrorLayout from 'layouts/Error'

const routes = [
  {
    path: '/auth',
    component: T,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('components/Test'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('components/Test2'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
];

export default routes;
