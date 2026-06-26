import slugify from "slugify";
import invariant from "tiny-invariant";

const modules = import.meta.glob(`../content/*.md`, {
	query: "?raw",
	import: "default",
});

export type Post = {
	title: string;
	content: string;
	filepath: string;
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

/** @example
 * {
   "title": "A really deep title",
   "content": "# woah.",
   "filepath": "../content/A really deep title.md",
   "slug": "A-really-deep-title"
 }
 */
async function createSlugMappingForPosts() {
	for (const filepath in modules) {
		console.log("mapping:", filepath, slugify(filepath));
		const content = (await modules[filepath]()) as string;
		const title =
			filepath.split("/").pop()?.replace(".md", "") || "Untitled";
		slugMapping[slugify(title)] = {
			title,
			content,
			filepath,
			slug: slugify(title),
		};
		console.log(
			"slug mapping:",
			slugify(title),
			slugMapping[slugify(title)],
		);
	}
}
