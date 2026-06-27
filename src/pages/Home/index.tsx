import "./style.css";
import { useState, useEffect } from "preact/hooks";
import { getAllPosts, Post } from "../../utils/getPost";
import { Card } from "react-bootstrap";
import { MarkdownPage } from "../../components/MarkdownPage";
import { getPost } from "../../utils/getPost";

export function Home() {
	const [posts, setPosts] = useState<Post[] | null>([]);
	const [about, setAbout] = useState<Post | null>(null);
	const [links, setLinks] = useState<Post | null>(null);
	const [footer, setFooter] = useState<Post | null>(null);

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
		getPost("Links.md").then((post) => {
			setLinks(post);
		});
		getPost("Footer.md").then((post) => {
			setFooter(post);
		});
	}, []);
	return (
		<div className="home">
			<header className="header">
				{/*TODO: make home and avni clickable (along with all other paths) */}
				<h1>/home/avni/</h1>
			</header>

			<div className="content">
				{/* About */}
				<div>
					<h2>about</h2>
					<div>
						{about && <MarkdownPage content={about.content} />}
					</div>
				</div>

				{/* Links */}
				<div>
					<h2>links</h2>
					{links && <MarkdownPage content={links.content} />}
				</div>

				{/*Blog */}
				<div>
					<h2>blog</h2>
				</div>
				<>
					{posts
						?.filter(
							(p) =>
								p.title !== "About" &&
								p.title !== "Links" &&
								p.title !== "Footer",
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
									<Card.Text style={{ fontStyle: "italic" }}>
										{post.date}
									</Card.Text>
								</Card.Body>
							</Card>
						))}
				</>
				<div>{footer && <MarkdownPage content={footer.content} />}</div>
			</div>
		</div>
	);
}
function openPage(post: Post) {
	window.location.href = `/content/${post.filepath}`;
}
