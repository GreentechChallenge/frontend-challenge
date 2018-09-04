import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./components/signup/signup";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Signup} />
		</Switch>
	</BrowserRouter>
	, document.getElementById("root"));
registerServiceWorker();
