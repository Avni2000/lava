import * as HoverCard from "@radix-ui/react-hover-card";
import { ComponentChildren } from "preact";
import { Link } from "wouter-preact";
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
				<Link href={link} className={className}>
					{children}
				</Link>
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
