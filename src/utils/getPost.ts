import slugify from "slugify";
import invariant from "tiny-invariant";
import fm from "front-matter";

const modules = import.meta.glob(`../content/*.md`, {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

export type Post = {
	title: string;
	content: string;
	filepath: string;
	date: string;
	slug: string;
	blogPost: boolean;
};

interface PostFrontmatter {
	date?: string;
	title?: string;
	blogPost?: boolean;
}

// Good Result:
// filepath = "../content/A really deep title.md"
// slug = "a-really-deep-title
// title = A really deep title
const allPosts: Post[] = Object.entries(modules).map(([filepath, raw]) => {
	// We expect the content to be markdown, and data to be frontmatter (including date as a property)
	const { attributes, body } = fm<PostFrontmatter>(raw);
	invariant(attributes?.date, `attributes.date is required in ${filepath}`);
	invariant(attributes?.title, `attributes.title is required in ${filepath}`);
	const title = attributes.title;
	return {
		title,
		content: body,
		filepath,
		date: attributes.date,
		slug: slugify(title),
		blogPost: attributes.blogPost ?? true,
	};
});

const slugMapping: Record<string, Post> = Object.fromEntries(
	allPosts.map((post) => [post.slug, post]),
);

export function getAllPosts(): Post[] {
	return allPosts;
}

/**
 * Retrieves post by filepath or slug.
 * @param filepathOrSlug The filepath (e.g. "About.md") or slug of the post.
 * @returns The post object.
 */
export function getPost(filepathOrSlug: string): Post {
	const title = filepathOrSlug.split("/").pop()?.replace(".md", "") || "";
	invariant(
		!title.includes("content"),
		"filepathOrSlug must not include 'content'",
	);
	const post = slugMapping[slugify(title)];
	invariant(post, `Post not found for slug: ${filepathOrSlug}`);
	return post;
}
