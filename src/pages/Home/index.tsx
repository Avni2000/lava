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
			<div>
				<h2>blog</h2>
			</div>
			<Container>
				<Row>
					<div>
						{posts?.map((post) => (
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
									<Card.Text style={{ fontStyle: "italic" }}>
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
