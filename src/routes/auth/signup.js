import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from '../../components/auth';

export default prefix => (
	<Switch>
		<Route exact path={prefix} component={Signup} />
	</Switch>
);
