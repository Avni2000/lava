import preactLogo from '../../assets/preact.svg';
import './style.css';
import {useState, useEffect} from 'preact/hooks';
import { MarkdownPage } from '../../components/MarkdownPage';
import { getMarkdownFiles, Post } from '../../utils/getPosts';
export function Home() {
	const [posts, setPosts] = useState<Post[] | null>([]);

	useEffect(() => {
		getMarkdownFiles().then(files => setPosts(files));
	}, []);

	return (
		<>
			<div class="home">
				<h1>~Avni/</h1>
			</div>
			<MarkdownPage content={posts?.[0]?.content || '# Hello Markdown'} />
		</>
		


		// <div class="home">
		// 	<a href="https://preactjs.com" target="_blank">
		// 		<img src={preactLogo} alt="Preact logo" height="160" width="160" />
		// 	</a>
		// 	<h1>Get Started building Vite-powered Preact Apps </h1>
		// 	<section>
		// 		<Resource
		// 			title="Learn Preact"
		// 			description="If you're new to Preact, try the interactive tutorial to learn important concepts"
		// 			href="https://preactjs.com/tutorial"
		// 		/>
		// 		<Resource
		// 			title="Differences to React"
		// 			description="If you're coming from React, you may want to check out our docs to see where Preact differs"
		// 			href="https://preactjs.com/guide/v10/differences-to-react"
		// 		/>
		// 		<Resource
		// 			title="Learn Vite"
		// 			description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
		// 			href="https://vitejs.dev"
		// 		/>
		// 	</section>
		// </div>
	);
}

