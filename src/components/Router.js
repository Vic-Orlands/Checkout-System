import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Cart from './Cart';

const Router = () => {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/" component={Homepage} exact={true} />
					<Route path="/cart" component={Cart} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};
export default Router;
