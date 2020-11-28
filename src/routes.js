/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { DashboardLayout } from 'layouts';
import PresentationView from 'views/Presentation';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/presentation" />
  },
 
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      
      {
        path: '/presentation',
        exact: true,
        component: PresentationView
      },
     
    ]
  }
];

export default routes;
