import { Link, useParams } from "wouter-preact";
import { MarkdownPage } from "./MarkdownPage";
import { getPost } from "../utils/getPost";

export function Post() {
  const params = useParams();
  const slug = params?.slug;

  if (!slug) return <div>Error: No post slug provided</div>;

  let post;
  try {
    post = getPost(slug);
  } catch (err) {
    return (
      <div>
        Error: {err instanceof Error ? err.message : "Failed to load post"}
      </div>
    );
  }

  return post.blogPost ? (
    <div>
      <header className="post-header">
        <h1 className="post-title">{post.title} </h1>
        <p className="post-path">
          <Link href="/">~</Link>/content/{post.slug.toLocaleLowerCase()}
        </p>
      </header>
      <MarkdownPage content={post.content} />
    </div>
  ) : (
    <MarkdownPage content={post.content} />
  );
}
