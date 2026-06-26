import "./style.css";
import { useState, useEffect } from "preact/hooks";
import { getAllPosts, Post } from "../../utils/getPost";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

export function Home() {
	const [posts, setPosts] = useState<Post[] | null>([]);

	useEffect(() => {
		getAllPosts()
			.then((p) => {
				setPosts(p);
				return p; // Pass the data to the next .then
			})
			.then(console.log);
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
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<h2>blog</h2>
			</div>
			<Container>
				<Row>
					<div class="posts">
						{posts?.map((post) => (
							<Card
								key={post.title}
								onClick={() => openPage(post)}
								style={{
									className: "card",
									cursor: "pointer",
								}}
							>
								<Card.Body>
									<Card.Title>{post.title}</Card.Title>
									<p style={{ fontSize: "15px" }}>
										05/05/2025
									</p>
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
