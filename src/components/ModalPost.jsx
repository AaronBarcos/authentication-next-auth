import axios from "axios";
import { useEffect, useState } from "react";

function Modal({ idPost, closeModal }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const styleModal = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

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
    <div style={styleModal}>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.content}</p>
          <button onClick={() => closeModal()}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Modal;
