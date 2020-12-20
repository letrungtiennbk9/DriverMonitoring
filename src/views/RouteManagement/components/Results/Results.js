import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  colors,
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { GenericMoreButton, TableEditBar, Label } from 'components';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
}));

const Results = (props) => {
  const { className, routes, ...rest } = props;

  const classes = useStyles();

  const [selectedroutes, setSelectedroutes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (event) => {
    const currentSelectedroutes = event.target.checked ? routes.map((route) => route.id) : [];

    setSelectedroutes(currentSelectedroutes);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedroutes.indexOf(id);
    let newSelectedroutes = [];

    if (selectedIndex === -1) {
      newSelectedroutes = newSelectedroutes.concat(selectedroutes, id);
    } else if (selectedIndex === 0) {
      newSelectedroutes = newSelectedroutes.concat(selectedroutes.slice(1));
    } else if (selectedIndex === selectedroutes.length - 1) {
      newSelectedroutes = newSelectedroutes.concat(selectedroutes.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedroutes = newSelectedroutes.concat(
        selectedroutes.slice(0, selectedIndex),
        selectedroutes.slice(selectedIndex + 1)
      );
    }

    setSelectedroutes(newSelectedroutes);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {`${routes.length} Records found. Page ${page + 1} of ${Math.ceil(routes.length / rowsPerPage)}`}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All routes." />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedroutes.length === routes.length}
                        color="primary"
                        indeterminate={selectedroutes.length > 0 && selectedroutes.length < routes.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Start Location</TableCell>
                    <TableCell>End Location</TableCell>
                    <TableCell>Stop Points</TableCell>
                    <TableCell>Created At</TableCell>

                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routes.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((route) => (
                    <TableRow key={route.id} hover selected={selectedroutes.indexOf(route.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedroutes.indexOf(route.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, route.id)}
                          value={selectedroutes.indexOf(route.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>{route.name}</TableCell>
                      <TableCell>{route.startpoint}</TableCell>
                      <TableCell>{route.endpoint}</TableCell>
                      <TableCell>{route.stoppoints}</TableCell>
                      <TableCell>{route.createdAt}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/management/routes/1"
                          variant="outlined"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={routes.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedroutes} />
    </div>
  );
};

Results.defaultProps = {
  routes: [],
};

export default Results;
