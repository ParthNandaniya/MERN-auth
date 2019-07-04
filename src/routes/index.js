import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Signup from '../components/signup';
// import Signin from '../components/signin';
import Home from '../components/home';

import auth from './auth';
import dashboard from './dashboard';

export default () => (
	// <Switch>
	// 	<Route exact path="/" component={Signup} />
	// 	<Route path="/signin" component={Signin} />
	// 	<Route path="/home" component={Home} />
	// 	{/* <Route path="/home" render={(routeProps) => <Home />} /> */}
	// </Switch>
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/auth" render={() => auth('/auth')} />
		<Route path="/dashboard" render={() => dashboard('/dashboard')} />
	</Switch>
);
