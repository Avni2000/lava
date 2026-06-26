import { useRoute } from "preact-iso";
import { MarkdownPage } from "./MarkdownPage";
import { getPost } from "../utils/getPost";
import { useState, useEffect } from "preact/hooks";
import { Post } from "../utils/getPost";

export function Post() {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { params } = useRoute();
	const slug = params?.slug;

	useEffect(() => {
		if (!slug) {
			setError("No post slug provided");
			setLoading(false);
			return;
		}

		(async () => {
			try {
				const fetchedPost = await getPost(slug);
				setPost(fetchedPost);
			} catch (err) {
				setError(
					// Supposedly `err instanceof Error` is not optimal
					// https://stackoverflow.com/a/30469297
					err instanceof Error ? err.message : "Failed to load post",
				);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!post) return null;
	return <MarkdownPage content={post.content} />;
}
3;
