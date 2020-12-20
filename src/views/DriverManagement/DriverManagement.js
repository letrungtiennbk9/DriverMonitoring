import React, { useState } from 'react';
import { Page, SearchBar } from 'components';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import { Header, Results, AddEditDriver } from './components';

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
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '2',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',
    status: 'Idle',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '3',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',
    status: 'On Drive',
    phone: '192580192',
    orders: 1,
  },
  {
    id: '4',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',
    status: 'Deactivate',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '5',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '6',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 1,
  },
  {
    id: '7',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',

    status: 'Idle',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '8',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',
    status: 'On Drive',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '9',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 1,
  },
  {
    id: '10',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '11',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '12',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',

    status: 'On Drive',
    phone: '192580192',
    orders: 1,
  },
];

const DriverManagement = (props) => {
  const classes = useStyles();

  const [drivers, setDrivers] = useState(() => mockState);
  const [driverModal, setDriverModal] = useState({
    open: false,
    driver: null,
  });
  const handleFilter = () => {};
  const handleSearch = () => {};

  const handleDriverNew = () => {
    setDriverModal({
      open: true,
      driver: null,
    });
  };

  const handleDriverDelete = (driver) => {
    setDrivers((drivers) => drivers.filter((e) => e.id !== driver.id));
    setDriverModal({
      open: false,
      driver: null,
    });
  };

  const handleModalClose = () => {
    setDriverModal({
      open: false,
      driver: null,
    });
  };

  const handleDriverAdd = (driver) => {
    setDrivers((drivers) => [...drivers, driver]);
    setDriverModal({
      open: false,
      driver: null,
    });
  };

  const handleDriverEdit = (driver) => {
    setDrivers((drivers) => drivers.map((e) => (e.id === driver.id ? driver : e)));
    setDriverModal({
      open: false,
      driver: null,
    });
  };

  return (
    <Page className={classes.root} title="Customer Management List">
      <Header onAddEditClick={handleDriverNew} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {drivers && <Results className={classes.results} drivers={drivers} />}
      <Modal onClose={handleModalClose} open={driverModal.open}>
        <AddEditDriver
          driver={driverModal.driver}
          onAdd={handleDriverAdd}
          onCancel={handleModalClose}
          onDelete={handleDriverDelete}
          onEdit={handleDriverEdit}
        />
      </Modal>
    </Page>
  );
};

export default DriverManagement;
