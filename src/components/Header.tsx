import { Link, useLocation } from "wouter-preact";

export function Header() {
	const [path] = useLocation();

	return (
		<header>
			<nav>
				<Link href="/" class={path == "/" ? "active" : undefined}>
					Home
				</Link>
				<Link href="/404" class={path == "/404" ? "active" : undefined}>
					404
				</Link>
			</nav>
		</header>
	);
}
