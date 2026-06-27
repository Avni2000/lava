import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import rehypeRaw from "rehype-raw";
// Will be useful down the line.
export function MarkdownPage({ content }: { content: string }) {
	return (
		<Markdown
			skipHtml={false}
			rehypePlugins={[rehypeRaw]}
			remarkPlugins={[[remarkSmartypants, { dashes: "oldschool" }]]}
		>
			{content}
		</Markdown>
	);
}
