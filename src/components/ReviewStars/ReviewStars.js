import React from 'react';

import clsx from 'clsx';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 18,
    height: 18,
    width: 18,
  },
  starFilledIcon: {
    color: colors.amber[400],
  },
  starBorderIcon: {
    color: theme.palette.icon,
  },
}));

const ReviewStars = (props) => {
  const { value, starCount, className, ...rest } = props;

  const classes = useStyles();
  const starNodes = [];

  for (let i = 1; i <= starCount; i++) {
    const key = uuid();

    const starNode =
      i <= value ? (
        <StarIcon key={key} className={clsx(classes.starIcon, classes.starFilledIcon)} />
      ) : (
        <StarBorderIcon key={key} className={clsx(classes.starIcon, classes.starBorderIcon)} />
      );

    starNodes.push(starNode);
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {starNodes}
    </div>
  );
};

ReviewStars.defaultProps = {
  value: 0,
  starCount: 5,
};

export default ReviewStars;
