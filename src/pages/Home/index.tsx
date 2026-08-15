import "./style.css";
import { getAllPosts, getPost } from "../../utils/getPost";
import { Card } from "react-bootstrap";
import { MarkdownPage } from "../../components/MarkdownPage";
import WikiLink from "../../components/Wikilink";

export function Home() {
	const posts = getAllPosts();
	const about = getPost("About.md");
	const links = getPost("Links.md");
	const footer = getPost("Footer.md");

	return (
		<div className="home">
			<header className="header">
        <h1>/home/avni/ </h1>

			</header>

			<div className="content">
				{/* About */}
				<div>
					<h2>about</h2>
					<div>
						<MarkdownPage content={about.content} />
					</div>
				</div>

				{/* Links */}
				<div>
					<h2>links</h2>
					<MarkdownPage content={links.content} />
				</div>

				{/*Blog */}
				<div>
					<h2>blog</h2>
				</div>
				<>
					{posts
						.filter((p) => p.blogPost)
            .map((post) => (
              <div>
								<WikiLink
									key={post.title}
									link={`/content/${post.slug}`}
									preview={post.content}
									className="post-link"
								>
									<Card
										style={{
											cursor: "pointer",
										}}
									>
										<Card.Body
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "left",
												justifyContent: "space-between",
											}}
											className="post"
                    >

											<Card.Title style={{ fontWeight: 600 }}>
												{post.title}
											</Card.Title>
                      <Card.Text

												style={{ margin: "5px 0 0 0", fontStyle: "italic" }}
                      >
                          {post.date}
											</Card.Text>
										</Card.Body>
									</Card>
								</WikiLink>
              </div>
						))}
				</>
				<div>
					<MarkdownPage content={footer.content} />
				</div>
			</div>
		</div>
	);
}
