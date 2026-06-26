import slugify from "slugify";
import invariant from "tiny-invariant";
import fm from "front-matter";

const modules = import.meta.glob(`../content/*.md`, {
	query: "?raw",
	import: "default",
});

export type Post = {
	title: string;
	content: string;
	filepath: string;
	date: string;
	slug: string;
};

const slugMapping: Record<string, Post> = {};

export async function getAllPosts(): Promise<Post[]> {
	const posts: Post[] = [];
	for (const filepath in modules) {
		posts.push(await getPost(filepath));
	}
	return posts;
}

// Good Result:
// filepath = "../content/A really deep title.md"
// slug = "a-really-deep-title
// title = A really deep title
//
/**
 * Retrieves post by filepath
 * @param filepathOrSlug The filepath of the post.
 * @returns The post object.
 */
export async function getPost(filepathOrSlug: string) {
	// is in cache?
	const title = filepathOrSlug.split("/").pop()?.replace(".md", "") || "";

	invariant(
		!title.includes("content"),
		"filepathOrSlug must not include 'content'",
	);
	if (slugMapping[slugify(title)]) {
		return slugMapping[slugify(title)];
	} else {
		// not in cache, create mapping
		await createSlugMappingForPosts();
		// is in cache now?
		if (slugMapping[slugify(title)]) {
			return slugMapping[slugify(title)];
		}
	}
	// still not in cache, throw error
	throw new Error(`Post not found for slug: ${filepathOrSlug}`);
}
interface PostFrontmatter {
	date?: string;
	title?: string;
}

/** @example
 * {
   "title": "A really deep title",
   "content": "# woah.",
   "filepath": "../content/A really deep title.md",
   "slug": "A-really-deep-title"
 }
 */
async function createSlugMappingForPosts() {
	// (re) populates cache by loading all posts from the content directory
	for (const filepath in modules) {
		console.log("mapping:", filepath, slugify(filepath));
		const str = (await modules[filepath]()) as string;
		// We expect the content to be markdown, and data to be frontmatter (including date as a property)
		const { attributes, body } = fm<PostFrontmatter>(str);
		invariant(attributes?.date, "attributes.date is required");
		const title =
			attributes.title ||
			filepath.split("/").pop()?.replace(".md", "") ||
			"Untitled";
		slugMapping[slugify(title)] = {
			title,
			content: body,
			filepath,
			date: attributes.date,
			slug: slugify(title),
		};
		console.log(
			"slug mapping:",
			slugify(title),
			slugMapping[slugify(title)],
		);
	}
}
