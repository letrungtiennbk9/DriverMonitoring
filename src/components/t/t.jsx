import React, {Suspense} from 'react';
import { renderRoutes } from 'react-router-config';
import { LinearProgress } from '@material-ui/core';

const t = (props) => {
  const { route } = props;

  return (
    <Suspense fallback={<LinearProgress />}>
      {renderRoutes(route.routes)}
    </Suspense>
  );
};

export default t;
