/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { Label } from 'components';

export default [
  {
    title: 'Control Panel',
    pages: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon,
      },
      {
        title: 'Dashboards',
        href: '/dashboards',
        icon: DashboardIcon,
        children: [
          {
            title: 'Default',
            href: '/dashboards/default',
          },
          {
            title: 'Analytics',
            href: '/dashboards/analytics',
          },
        ],
      },
      {
        title: 'Management',
        href: '/management',
        icon: BarChartIcon,
        children: [
          {
            title: 'Users',
            href: '/management/users',
          },
          {
            title: 'Drivers',
            href: '/management/drivers',
          },

          {
            title: 'Orders',
            href: '/management/orders',
          },
          {
            title: 'Order Details',
            href: '/management/orders/1',
          },
        ],
      },

      {
        title: 'Invoice',
        href: '/invoices/1',
        icon: ReceiptIcon,
      },

      {
        title: 'Chat',
        href: '/chat',
        icon: ChatIcon,
        label: () => (
          <Label color={colors.red[500]} shape="rounded">
            4
          </Label>
        ),
      },

      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        children: [
          {
            title: 'General',
            href: '/settings/general',
          },
          {
            title: 'Subscription',
            href: '/settings/subscription',
          },
          {
            title: 'Notifications',
            href: '/settings/notifications',
          },
          {
            title: 'Security',
            href: '/settings/security',
          },
        ],
      },
      {
        title: 'Authentication',
        href: '/auth',
        icon: LockOpenIcon,
        children: [
          {
            title: 'Login',
            href: '/auth/login',
          },
          {
            title: 'Register',
            href: '/auth/register',
          },
        ],
      },
      {
        title: 'Errors',
        href: '/errors',
        icon: ErrorIcon,
        children: [
          {
            title: 'Error 401',
            href: '/errors/error-401',
          },
          {
            title: 'Error 404',
            href: '/errors/error-404',
          },
          {
            title: 'Error 500',
            href: '/errors/error-500',
          },
        ],
      },
    ],
  },
];
