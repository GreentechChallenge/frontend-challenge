import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
		</Switch>
	</BrowserRouter>
	, document.getElementById("root"));
registerServiceWorker();
