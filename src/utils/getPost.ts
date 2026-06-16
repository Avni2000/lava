const modules = import.meta.glob(`../../public/content/*.md`, {
	query: "?raw",
	import: "default",
});

export type Post = {
	title: string;
	content: string;
	filepath: string;
};

export async function getAllPosts(): Promise<Post[]> {
	{
		const posts: Post[] = [];
		for (const filepath in modules) {
			const post = await getPost(filepath);
			posts.push(post);
		}
		return posts;
	}
}
export default async function getPost(filepath: string) {
	const content = (await modules[filepath]()) as string;
	const title = filepath.split("/").pop()?.split(".")?.[0] as string;
	return { title, content, filepath };
}
