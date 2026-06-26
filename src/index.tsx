import {
	LocationProvider,
	Router,
	Route,
	hydrate,
	prerender as ssr,
} from "preact-iso";

import { Home } from "./pages/Home/index";
import { Post } from "./components/Post";
import { NotFound } from "./pages/_404";
import "./style.css";

export function App() {
	return (
		<LocationProvider>
			{/* <Header /> */}
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/content/:slug" component={Post} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app") as HTMLElement);
}

/**
 * This is for Static Site Generation (SSG) -- it allows the site to load with HTML without waiting for JS to load.
 * @param data Data passed from the build tool (e.g., current URL)
 */
export async function prerender(data: any) {
	return await ssr(<App {...data} />);
}
