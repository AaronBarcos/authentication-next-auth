import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function idPost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const idPost = useRouter().query.idPost;

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/posts/${idPost}`);
      setPost(res.data.post);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}

export default idPost;
