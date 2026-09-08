import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import { inAppRoute } from "../utils/url";

function opensInNewTab(href: unknown) {
	return typeof href === "string" && !inAppRoute.test(href);
}

// Will be useful down the line.
export function MarkdownPage({ content }: { content: string }) {
	return (
		<div className="markdown-page">

			<Markdown
				skipHtml={false}
				remarkPlugins={[remarkGfm, remarkMath, [remarkSmartypants, { dashes: "oldschool" }]]}
				rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
				components={{
					a: ({ href, children, ...props }) =>
						opensInNewTab(href) ? (
							<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
								{children}
							</a>
						) : (
							<a href={href} {...props}>
								{children}
							</a>
						),
				}}
			>
				{content}
			</Markdown>
		</div>
	);
}
