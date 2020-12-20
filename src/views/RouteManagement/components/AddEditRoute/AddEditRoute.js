/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import { Box, colors, Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GoogleMapReact from 'google-map-react';
import { StopPointCard } from '../StopPointCard';

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

const AddEditRoute = forwardRef((props, ref) => {
  const { user, onDelete, onCancel, onAdd, onEdit, className, ...rest } = props;

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
        <Typography variant="h5">Route Infomation</Typography>
        <Button type="button" onClick={onCancel}>
          <CloseIcon />
        </Button>
      </Box>

      <Box display="flex" width="100%" margin="12px" flex="1">
        <Box display="flex" maxWidth={380} height="100%" flexDirection="column" border="2px dashed #ccc" padding="6px">
          {sampleData.map((data, index) => (
            <StopPointCard
              key={data}
              isEdge={index === 0 || index === sampleData.length - 1}
              value={data}
              index={index + 1}
            />
          ))}
        </Box>

        <Box display="flex" flex="1" maxHeight="calc(100vh - 100px)" marginLeft="16px">
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

          <Box maxWidth="100%" maxHeight="100%" overflow="scroll">
            <img alt="User flows" src="/images/presentation/map.png" className={classes.objectCover} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

AddEditRoute.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default AddEditRoute;
