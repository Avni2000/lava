import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Will be useful down the line.
export function MarkdownPage({ content }: { content: string }) {
	return (
		<div className="markdown-page">
		<Markdown
			skipHtml={false}
			remarkPlugins={[remarkGfm, remarkMath, [remarkSmartypants, { dashes: "oldschool" }]]}
			rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {content}
			</Markdown>
		</div>
	);
}
