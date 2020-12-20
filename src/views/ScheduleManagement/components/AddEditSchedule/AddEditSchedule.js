/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import { Box, colors, Button, Typography, Grid, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GoogleMapReact from 'google-map-react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ScheduledCard } from '../ScheduledCard';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    maxHeight: '100vh',
    maxWidth: '100vw',
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    boxSizing: 'border-box',
  },
  field: {
    marginTop: theme.spacing(3),
  },
  margin: {
    marginLeft: 30,
  },
  cancelButton: {
    marginLeft: 'auto',
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900],
    },
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  objectCover: {
    objectFit: 'contain',
  },
}));

const drivers = [{ name: 'Viet Thanh' }, { name: 'Trung Tien' }, { name: 'Chi Thanh' }, { name: 'Tan Thai' }];

const AddEditSchedule = forwardRef((props, ref) => {
  const { user, onDelete, onCancel, onAdd, onEdit, className, ...rest } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  // const handleFieldChange = (e) => {
  //   e.persist();
  //   setValues((values) => ({
  //     ...values,
  //     [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
  //   }));
  // };

  const sampleData = [
    '227 Nguyễn Văn Cừ, phường 4, Quận 5, Thành phố Hồ Chí Minh',
    '21 Hậu Giang, Phường 2, Quận 6, TP Hồ Chí Minh',
    '24 Trần Phú, Q. Hải Châu, TP. Đà Nẵng.',
    '30 HANG BONG, HANG GAI, HOAN KIEM, HA NOI',
    '392 CAU GIAY,Q.CAU GIAY,HA NOI',
  ];

  return (
    <Box className={classes.root}>
      <Box padding="12px" display="flex" justifyContent="space-between" alignItems="center">
        <Button type="button">
          <ArrowBackIcon />
        </Button>
        <Typography variant="h5">Schedule Infomation</Typography>
        <Button type="button" onClick={onCancel}>
          <CloseIcon />
        </Button>
      </Box>

      <Box display="flex" width="100%" margin="12px" flex="1">
        <Box display="flex" maxWidth={380} height="100%" flexDirection="column" border="2px dashed #ccc" padding="6px">
          {sampleData.map((data, index) => (
            <ScheduledCard
              key={data}
              isEdge={index === 0 || index === sampleData.length - 1}
              value={data}
              startTime={new Date().toUTCString()}
              drivers="Viet Thanh(M) - Trung Tien(S)"
              index={index + 1}
            />
          ))}
        </Box>

        <Box display="flex" flex="1" height="calc(100vh - 100px)" marginLeft="24px">
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA2ShBcYPOmQzSfBiLvrafmCawEYYxDBGw' }}
            defaultCenter={{
              center: {
                lat: 59.95,
                lng: 30.33,
              },
            }}
            defaultZoom={11}
          /> */}

          <Box width="100%" maxHeight="100%">
            <Box width="100%" display="flex" flexDirection="column">
              <Typography variant="h5">Current Stop Point : </Typography>
              <Typography variant="h4">227 Nguyễn Văn Cừ, phường 4, Quận 5, Thành phố Hồ Chí Minh</Typography>
            </Box>
            <Box marginTop="24px" display="flex" flexDirection="column">
              <Typography variant="h5">Choose Start Time : </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Box display="flex">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="outline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />

                  <KeyboardTimePicker
                    margin="normal"
                    variant="outline"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Box>
              </MuiPickersUtilsProvider>
            </Box>

            <Box marginTop="24px" display="flex" flexDirection="column">
              <Typography variant="h5">Choose Drivers for current route : </Typography>

              <Box display="flex" marginTop="12px">
                <Autocomplete
                  id="combo-box-demo"
                  options={drivers}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Choose Main Driver" variant="outlined" />}
                />
                <Box marginLeft="24px">
                  <Autocomplete
                    id="combo-box-demo"
                    options={drivers}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Choose Sub Driver" variant="outlined" />}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

AddEditSchedule.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default AddEditSchedule;
