import Markdown from "react-markdown";

// Will be useful down the line.
export function MarkdownPage({ content }: { content: string }) {
	return <Markdown>{content}</Markdown>;
}
