import React, { useState } from 'react';
import { Page, SearchBar } from 'components';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import { Header, Results, AddEditRoute } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

const mockState = [
  {
    id: '1',
    name: 'Ha Noi - Ho Chi Minh (Regular)',
    startpoint: 'Nam Tu Liem, Ha Noi',
    endpoint: 'Thu Duc, Tp. Ho Chi Minh',
    stoppoints: 5,
    createdAt: new Date().toUTCString(),
  },
];

const RouteManagement = (props) => {
  const classes = useStyles();

  const [routes, setRoutes] = useState(() => mockState);
  const [routeModal, setRouteModal] = useState({
    open: false,
    route: null,
  });
  const handleFilter = () => {};
  const handleSearch = () => {};

  const handleRouteNew = () => {
    setRouteModal({
      open: true,
      route: null,
    });
  };

  const handleRouteDelete = (route) => {
    setRoutes((routes) => routes.filter((e) => e.id !== route.id));
    setRouteModal({
      open: false,
      route: null,
    });
  };

  const handleModalClose = () => {
    setRouteModal({
      open: false,
      route: null,
    });
  };

  const handleRouteAdd = (route) => {
    setRoutes((routes) => [...routes, route]);
    setRouteModal({
      open: false,
      route: null,
    });
  };

  const handleRouteEdit = (route) => {
    setRoutes((routes) => routes.map((e) => (e.id === route.id ? route : e)));
    setRouteModal({
      open: false,
      route: null,
    });
  };

  return (
    <Page className={classes.root} title="Route Management List">
      <Header onAddEditClick={handleRouteNew} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {routes && <Results className={classes.results} routes={routes} />}
      <Modal onClose={handleModalClose} open={routeModal.open}>
        <AddEditRoute
          route={routeModal.route}
          onAdd={handleRouteAdd}
          onCancel={handleModalClose}
          onDelete={handleRouteDelete}
          onEdit={handleRouteEdit}
        />
      </Modal>
    </Page>
  );
};

export default RouteManagement;
