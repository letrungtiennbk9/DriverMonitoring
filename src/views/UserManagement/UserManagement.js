import React, { useState } from 'react';
import { Page, SearchBar } from 'components';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import { Header, Results, AddEditUser } from './components';

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
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '2',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Deactivate',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '3',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 1,
  },
  {
    id: '4',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Deactivate',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '5',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '6',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 1,
  },
  {
    id: '7',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Deactivate',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '8',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '9',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 1,
  },
  {
    id: '10',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Ice bear',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 12,
  },
  {
    id: '11',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Pan Pan',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 15,
  },
  {
    id: '12',
    avatar: '/images/avatars/icebear.jpg',
    name: 'Grizzly',
    company: 'GHN Logistics',
    type: 'Admin',
    status: 'Normal',
    phone: '192580192',
    orders: 1,
  },
];

const UserManagement = (props) => {
  const classes = useStyles();

  const [users, setUsers] = useState(() => mockState);
  const [userModal, setUserModal] = useState({
    open: false,
    user: null,
  });
  const handleFilter = () => {};
  const handleSearch = () => {};

  const handleUserNew = () => {
    setUserModal({
      open: true,
      user: null,
    });
  };

  const handleUserDelete = (user) => {
    setUsers((users) => users.filter((e) => e.id !== user.id));
    setUserModal({
      open: false,
      user: null,
    });
  };

  const handleModalClose = () => {
    setUserModal({
      open: false,
      user: null,
    });
  };

  const handleUserAdd = (user) => {
    setUsers((users) => [...users, user]);
    setUserModal({
      open: false,
      user: null,
    });
  };

  const handleUserEdit = (user) => {
    setUsers((users) => users.map((e) => (e.id === user.id ? user : e)));
    setUserModal({
      open: false,
      user: null,
    });
  };

  return (
    <Page className={classes.root} title="Customer Management List">
      <Header onAddEditClick={handleUserNew} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {users && <Results className={classes.results} users={users} />}
      <Modal onClose={handleModalClose} open={userModal.open}>
        <AddEditUser
          user={userModal.user}
          onAdd={handleUserAdd}
          onCancel={handleModalClose}
          onDelete={handleUserDelete}
          onEdit={handleUserEdit}
        />
      </Modal>
    </Page>
  );
};

export default UserManagement;
