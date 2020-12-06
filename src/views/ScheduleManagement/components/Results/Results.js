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
  const { className, schedules, ...rest } = props;

  const classes = useStyles();

  const [selectedschedules, setSelectedschedules] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (event) => {
    const currentSelectedschedules = event.target.checked ? schedules.map((schedule) => schedule.id) : [];

    setSelectedschedules(currentSelectedschedules);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedschedules.indexOf(id);
    let newSelectedschedules = [];

    if (selectedIndex === -1) {
      newSelectedschedules = newSelectedschedules.concat(selectedschedules, id);
    } else if (selectedIndex === 0) {
      newSelectedschedules = newSelectedschedules.concat(selectedschedules.slice(1));
    } else if (selectedIndex === selectedschedules.length - 1) {
      newSelectedschedules = newSelectedschedules.concat(selectedschedules.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedschedules = newSelectedschedules.concat(
        selectedschedules.slice(0, selectedIndex),
        selectedschedules.slice(selectedIndex + 1)
      );
    }

    setSelectedschedules(newSelectedschedules);
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
        {`${schedules.length} Records found. Page ${page + 1} of ${Math.ceil(schedules.length / rowsPerPage)}`}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All schedules." />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedschedules.length === schedules.length}
                        color="primary"
                        indeterminate={selectedschedules.length > 0 && selectedschedules.length < schedules.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Route</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Issues</TableCell>

                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedules.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((schedule) => (
                    <TableRow key={schedule.id} hover selected={selectedschedules.indexOf(schedule.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedschedules.indexOf(schedule.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, schedule.id)}
                          value={selectedschedules.indexOf(schedule.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>{schedule.name}</TableCell>
                      <TableCell>{schedule.route}</TableCell>
                      <TableCell>{schedule.startTime}</TableCell>
                      <TableCell>{schedule.status}</TableCell>
                      <TableCell>{schedule.issues}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/management/schedules/1"
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
            count={schedules.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedschedules} />
    </div>
  );
};

Results.defaultProps = {
  schedules: [],
};

export default Results;
