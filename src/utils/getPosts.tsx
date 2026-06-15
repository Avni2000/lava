const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' });

export type Post = {
    filename: string ;
    content: string ;
    filepath: string ;
}
export async function getMarkdownFiles() : Promise<Post[]> { {
  const posts: Post[] = [];
  for (const filepath in modules) {
    const content = await modules[filepath]() as string;
    const filename = filepath.split('/').pop() as string; 
    posts.push({ filename, content, filepath });
  }
  return posts;
}}