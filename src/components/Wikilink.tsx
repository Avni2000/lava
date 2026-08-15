import * as HoverCard from "@radix-ui/react-hover-card";
import { ComponentChildren } from "preact";
import { JSX } from "preact";
import { useLocation, useRouter } from "wouter-preact";
import { MarkdownPage } from "./MarkdownPage";
import "./styles.css";
export default function WikiLink({
	link,
	children,
	preview,
	className,
}: {
	link: string;
	children?: ComponentChildren;
	preview?: string;
	className?: string;
}) {
	const router = useRouter();
	const [, navigate] = useLocation();

	// wouter-preact's <Link> doesn't forward refs (its `forwardRef` is a
	// no-op stub), which breaks Radix's `asChild` trigger positioning. Drive
	// navigation off a plain <a> instead so the ref reaches Radix intact.
	const onClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
		if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0) return;
		event.preventDefault();
		navigate(link);
	};

	return (
		<HoverCard.Root openDelay={100}>
			<HoverCard.Trigger asChild>
				<a href={router.base + link} onClick={onClick} className={className}>
					{children}
				</a>
			</HoverCard.Trigger>
			{preview && (
				<HoverCard.Content className="HoverCardContent" sideOffset={8}>
					<div className="HoverCardPreview">
						<MarkdownPage content={preview} />
					</div>
					<HoverCard.Arrow className="HoverCardArrow" width={14} height={7} />
				</HoverCard.Content>
			)}
		</HoverCard.Root>
	);
}
