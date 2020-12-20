import React from 'react';
import { Box, makeStyles, Typography, colors } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  edge: {
    backgroundColor: '#3b5998',
    borderRadius: '6px',
  },

  edgeColor: {
    color: '#fff',
  },
  edgeChips: {
    color: '#fff',

    padding: '4px 8px',
    borderRadius: '4px',
  },

  startChips: {
    background: colors.green[600],
  },
  endChips: {
    background: '#000',
  },
}));

const ScheduledCard = ({ isEdge, value, index, startTime, drivers }) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(index === 1 && classes.edge)}
      border="1px solid ccc"
      maxWidth="100%"
      borderBottom=".5px solid #ccc"
      flexDirection="column"
      minHeight="100px"
      padding="12px"
    >
      <Box display="flex" alignItems="center">
        {isEdge && (
          <Typography
            className={clsx(classes.edgeChips, index === 1 ? classes.startChips : classes.endChips)}
            variant="h6"
          >
            {index === 1 && 'Start'}
            {isEdge && index !== 1 && 'End'}
          </Typography>
        )}
        <Typography className={clsx(index === 1 && classes.edgeColor)} variant="h4">
          {index},
        </Typography>
      </Box>
      <Typography className={clsx(index === 1 && classes.edgeColor)} variant="body1">
        {value}
      </Typography>
      <Typography className={clsx(index === 1 && classes.edgeColor)} variant="body1">
        Start Time : {startTime}
      </Typography>
      <Typography className={clsx(index === 1 && classes.edgeColor)} variant="body1">
        Drivers : {drivers}
      </Typography>
    </Box>
  );
};

export default ScheduledCard;
