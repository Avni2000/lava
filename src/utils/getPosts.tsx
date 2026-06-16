const modules = import.meta.glob(`../../public/content/*.md`, {
	query: "?raw",
	import: "default",
});

export type Post = {
	title: string;
	content: string;
	filepath: string;
};
export async function getMarkdownFiles(): Promise<Post[]> {
	{
		const posts: Post[] = [];
		for (const filepath in modules) {
			const content = (await modules[filepath]()) as string;
			const title = filepath.split("/").pop()?.split(".")?.[0] as string;
			posts.push({ title, content, filepath });
		}
		return posts;
	}
}
