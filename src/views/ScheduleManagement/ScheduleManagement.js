import React, { useState } from 'react';
import { Page, SearchBar } from 'components';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import { Header, Results, AddEditSchedule } from './components';

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
    name: 'GKE - HN_HCM 2/12',
    route: 'Ha Noi - Ho Chi Minh (Regular)',
    startTime: new Date().toUTCString(),
    status: 'On Track',

    issues: 2,
    createdAt: new Date().toUTCString(),
  },
  {
    id: '2',
    name: 'CDA - HN_HCM 2/12',
    route: 'Ha Noi - Ho Chi Minh (Regular)',
    startTime: new Date().toUTCString(),
    status: 'Delayed',
    issues: 5,
    createdAt: new Date().toUTCString(),
  },
  {
    id: '3',
    name: 'KDE - HN_HCM 2/12',
    route: 'Ha Noi - Ho Chi Minh (Regular)',
    startTime: new Date().toUTCString(),
    status: 'Waiting',
    issues: 0,
    createdAt: new Date().toUTCString(),
  },
];

const ScheduleManagement = (props) => {
  const classes = useStyles();

  const [schedules, setSchedules] = useState(() => mockState);
  const [scheduleModal, setScheduleModal] = useState({
    open: false,
    schedule: null,
  });
  const handleFilter = () => {};
  const handleSearch = () => {};

  const handleScheduleNew = () => {
    setScheduleModal({
      open: true,
      schedule: null,
    });
  };

  const handleScheduleDelete = (schedule) => {
    setSchedules((schedules) => schedules.filter((e) => e.id !== schedule.id));
    setScheduleModal({
      open: false,
      schedule: null,
    });
  };

  const handleModalClose = () => {
    setScheduleModal({
      open: false,
      schedule: null,
    });
  };

  const handleScheduleAdd = (schedule) => {
    setSchedules((schedules) => [...schedules, schedule]);
    setScheduleModal({
      open: false,
      schedule: null,
    });
  };

  const handleScheduleEdit = (schedule) => {
    setSchedules((schedules) => schedules.map((e) => (e.id === schedule.id ? schedule : e)));
    setScheduleModal({
      open: false,
      schedule: null,
    });
  };

  return (
    <Page className={classes.root} title="Schedule Management List">
      <Header onAddEditClick={handleScheduleNew} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {schedules && <Results className={classes.results} schedules={schedules} />}
      <Modal onClose={handleModalClose} open={scheduleModal.open}>
        <AddEditSchedule
          schedule={scheduleModal.schedule}
          onAdd={handleScheduleAdd}
          onCancel={handleModalClose}
          onDelete={handleScheduleDelete}
          onEdit={handleScheduleEdit}
        />
      </Modal>
    </Page>
  );
};

export default ScheduleManagement;
