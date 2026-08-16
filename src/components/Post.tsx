import { useEffect } from "preact/hooks";
import { Link, useParams } from "wouter-preact";
import { MarkdownPage } from "./MarkdownPage";
import { getPost } from "../utils/getPost";

export function Post() {
  const params = useParams();
  const slug = params?.slug;

  let post: ReturnType<typeof getPost> | undefined;
  let error: string | undefined;
  if (slug) {
    try {
      post = getPost(slug);
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load post";
    }
  }

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title}`;
    return () => {
      document.title = "Avni Badiwale";
    };
  }, [post?.title]);

  if (!slug) return <div>Error: No post slug provided</div>;
  if (!post) return <div>Error: {error}</div>;

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
