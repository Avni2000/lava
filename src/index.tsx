import { render } from "preact";
import { Router, Switch, Route } from "wouter-preact";

import { Home } from "./pages/Home/index";
import { Post } from "./components/Post";
import { NotFound } from "./utils/_404";
import { ROUTER_BASE } from "./utils/url";
import "./style.css";

export function App() {
	return (
		<Router base={ROUTER_BASE}>
			<main>
				<Switch>
					<Route path="/" component={Home} />
					<Route path="/content/:slug" component={Post} />
					<Route component={NotFound} />
				</Switch>
			</main>
		</Router>
	);
}

if (typeof window !== "undefined") {
	render(<App />, document.getElementById("app") as HTMLElement);
}
