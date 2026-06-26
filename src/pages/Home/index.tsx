import "./style.css";
import { useState, useEffect } from "preact/hooks";
import { getAllPosts, Post } from "../../utils/getPost";
import { Button, Card, Table } from "react-bootstrap";

export function Home() {
  const [posts, setPosts] = useState<Post[] | null>([]);

  useEffect(() => {
    getAllPosts()
      .then((p) => {
        setPosts(p);
        return p; // Pass the data to the next .then
      })
      .then(console.log);
  }, []);
  return (
    <>
      <div class="home">
        <h1>~Avni/</h1>
      </div>
      <div class="posts">
        {posts?.map((post) => (
          <Card
            key={post.title}
            onClick={() => openPage(post)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
function openPage(post: Post) {
  window.location.href = `/content/${post.filepath}`;
}
