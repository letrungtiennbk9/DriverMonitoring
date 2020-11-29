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
  const { className, drivers, ...rest } = props;

  const classes = useStyles();

  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (event) => {
    const currentSelectedDrivers = event.target.checked ? drivers.map((driver) => driver.id) : [];

    setSelectedDrivers(currentSelectedDrivers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDrivers.indexOf(id);
    let newSelectedDrivers = [];

    if (selectedIndex === -1) {
      newSelectedDrivers = newSelectedDrivers.concat(selectedDrivers, id);
    } else if (selectedIndex === 0) {
      newSelectedDrivers = newSelectedDrivers.concat(selectedDrivers.slice(1));
    } else if (selectedIndex === selectedDrivers.length - 1) {
      newSelectedDrivers = newSelectedDrivers.concat(selectedDrivers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDrivers = newSelectedDrivers.concat(
        selectedDrivers.slice(0, selectedIndex),
        selectedDrivers.slice(selectedIndex + 1)
      );
    }

    setSelectedDrivers(newSelectedDrivers);
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
        {`${drivers.length} Records found. Page ${page + 1} of ${Math.ceil(drivers.length / rowsPerPage)}`}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All drivers." />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedDrivers.length === drivers.length}
                        color="primary"
                        indeterminate={selectedDrivers.length > 0 && selectedDrivers.length < drivers.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Current Orders</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drivers.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((driver) => (
                    <TableRow key={driver.id} hover selected={selectedDrivers.indexOf(driver.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedDrivers.indexOf(driver.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, driver.id)}
                          value={selectedDrivers.indexOf(driver.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar className={classes.avatar} src={driver.avatar}>
                            {getInitials(driver.name)}
                          </Avatar>
                          <div>
                            <Link color="inherit" component={RouterLink} to="/management/drivers/1" variant="h6">
                              {driver.name}
                            </Link>
                            <div>{driver.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{driver.location}</TableCell>
                      <TableCell>{driver.id}</TableCell>
                      <TableCell>{driver.type}</TableCell>
                      <TableCell>
                        <Label
                          color={
                            // eslint-disable-next-line no-nested-ternary
                            driver.status === 'On Drive'
                              ? colors.green[600]
                              : driver.status === 'Idle'
                              ? colors.grey[600]
                              : colors.orange[600]
                          }
                        >
                          {driver.status}
                        </Label>
                      </TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.orders}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/management/drivers/1"
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
            count={drivers.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedDrivers} />
    </div>
  );
};

Results.defaultProps = {
  drivers: [],
};

export default Results;
