import React from 'react';
import { Switch, Route } from 'react-router-dom';

import login from './login';
import signup from './signup';

export default prefix => (
	<Switch>
		<Route path={`${prefix}/login`} render={() => login(`${prefix}/login`)} />
        <Route path={`${prefix}/signup`} render={() => signup(`${prefix}/signup`)} />
	</Switch>
);
