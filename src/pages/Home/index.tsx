import "./style.css";
import { useState, useEffect } from "preact/hooks";
import { getMarkdownFiles, Post } from "../../utils/getPosts";
import { Button, Card, Table } from "react-bootstrap";

export function Home() {
	const [posts, setPosts] = useState<Post[] | null>([]);

	useEffect(() => {
		getMarkdownFiles().then((p) => setPosts(p));
	}, []);

	return (
		<>
			<div class="home">
				<h1>~Avni/</h1>
			</div>
			<div class="posts">
				{posts?.map((post) => (
					<Card
						key={post.title}
						onClick={() => openPage(post)}
						style={{ cursor: "pointer" }}
					>
						<Card.Body>
							<Card.Title>{post.title}</Card.Title>
						</Card.Body>
					</Card>
				))}
			</div>
		</>
	);
}
function openPage(post: Post) {
	window.location.href = `/${post.filepath}`;
}
