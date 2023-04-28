import { useEffect, useState } from "react";
import axios from "axios";
import CreatePostForm from "../components/Form/CreatePostForm";

function dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/posts/post");
      setPosts(res.data.posts);
      setLoading(false);
      console.log(posts);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  } else if (errorMessage) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <h1>All posts</h1>
        <button onClick={() => setShowForm(true)}>Create Post</button>
        {showForm && (
          <CreatePostForm showFormCreatePost={() => setShowForm(false)} getPosts={getPosts}  />
        )}
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {posts.map((post) => (
            <div className="flex items-center" key={post._id}>
              <h2>{post.title}</h2>
              <img src={post.image} alt={post.title} />
              <p>{post.content}</p>
              {/* <p>{post.createdAt}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default dashboard;
