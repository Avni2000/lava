import * as HoverCard from "@radix-ui/react-hover-card";
import { ComponentChildren } from "preact";
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
	return (
		<HoverCard.Root>
			<HoverCard.Trigger asChild>
				<a href={link} className={className}>
					{children}
				</a>
			</HoverCard.Trigger>
			{preview && (
				<HoverCard.Content className="HoverCardContent">
					<MarkdownPage content={preview} />
					<HoverCard.Arrow className="HoverCardArrow" />
				</HoverCard.Content>
			)}
		</HoverCard.Root>
	);
}
