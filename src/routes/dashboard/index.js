import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../components/dashboard';
// import users from './users';
// import messages from './messages';

export default prefix => (
	<Switch>
		<Route exact path={prefix} component={Dashboard} />
		{/* <Route path={`${prefix}/users`} render={() => users(`${prefix}/users`)} />
		<Route path={`${prefix}/messages`} render={() => messages(`${prefix}/messages`)} /> */}
	</Switch>
);
