import "./style.css";
import { useState, useEffect } from "preact/hooks";
import { getAllPosts, Post } from "../../utils/getPost";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { MarkdownPage } from "../../components/MarkdownPage";
import { getPost } from "../../utils/getPost";

export function Home() {
	const [posts, setPosts] = useState<Post[] | null>([]);
	const [about, setAbout] = useState<Post | null>(null);
	const [links, setLinks] = useState<Post | null>(null);

	useEffect(() => {
		getAllPosts()
			.then((p) => {
				setPosts(p);
				return p; // Pass the data to the next .then
			})
			.then(console.log);
	}, []);
	useEffect(() => {
		getPost("About.md").then((post) => {
			setAbout(post);
		});
	}, []);
	useEffect(() => {
		getPost("Links.md").then((post) => {
			setLinks(post);
		});
	}, []);
	return (
		<>
			<header className="header">
				<h1>/home/avni/</h1>
				<p style={{ textAlign: "left" }} className="home-path">
					~/
				</p>
			</header>
			<div>
				<h2>about</h2>
				{about && <MarkdownPage content={about.content} />}
			</div>
			<div>
				<h2>links</h2>
				{links && <MarkdownPage content={links.content} />}
			</div>
			<div>
				<h2>blog</h2>
			</div>
			<Container>
				<Row>
					<div>
						{posts
							?.filter(
								(p) =>
									p.title !== "About" && p.title !== "Links",
							)
							.map((post) => (
								<Card
									key={post.title}
									onClick={() => openPage(post)}
									style={{
										cursor: "pointer",
									}}
								>
									<Card.Body
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
										}}
										className="post"
									>
										<Card.Title style={{ fontWeight: 600 }}>
											{post.title}
										</Card.Title>
										<Card.Text
											style={{ fontStyle: "italic" }}
										>
											{post.date}
										</Card.Text>
									</Card.Body>
								</Card>
							))}
					</div>
				</Row>
			</Container>
		</>
	);
}
function openPage(post: Post) {
	window.location.href = `/content/${post.filepath}`;
}
