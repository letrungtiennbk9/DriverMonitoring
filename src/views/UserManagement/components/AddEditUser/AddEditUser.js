/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormControl,
  Switch,
  colors,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
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
}));

const AddEditUser = forwardRef((props, ref) => {
  const { user, onDelete, onCancel, onAdd, onEdit, className, ...rest } = props;

  const classes = useStyles();

  const defaultUser = {
    id: '1212',
    name: 'User Name',
    location: 'User Location',
    type: 'Management',
    status: 'NORMAL',
    phone: '129580125',
    currentOrder: 0,
  };

  const [values, setValues] = useState(user || defaultUser);

  const mode = user ? 'edit' : 'add';

  const handleFieldChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  };

  const handleDelete = () => {
    onDelete && onDelete(user);
  };

  const handleAdd = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onAdd({ ...values, id: uuid() });
  };

  const handleEdit = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onEdit(values);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)} ref={ref}>
      <form>
        <CardContent>
          <Typography align="center" gutterBottom variant="h3">
            {mode === 'add' ? 'Add User' : 'Edit User'}
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Name"
            name="name"
            onChange={handleFieldChange}
            value={values.name}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            label="Location"
            name="location"
            onChange={handleFieldChange}
            value={values.location}
            variant="outlined"
          />
          <FormControl className={classes.field} variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.type}
              onChange={handleFieldChange}
              label="Type"
              name="type"
            >
              <MenuItem value="Management">Management</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={clsx(classes.field, classes.margin)} variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.status}
              onChange={handleFieldChange}
              label="Status"
              name="status"
            >
              <MenuItem value="NORMAL">Normal</MenuItem>
              <MenuItem value="DEACTIVATE">Deactivate</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton edge="start" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <Button className={classes.cancelButton} onClick={onCancel} variant="contained">
            Cancel
          </Button>
          {mode === 'add' ? (
            <Button className={classes.confirmButton} onClick={handleAdd} variant="contained">
              Add
            </Button>
          ) : (
            <Button className={classes.confirmButton} onClick={handleEdit} variant="contained">
              Save
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
});

AddEditUser.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default AddEditUser;
