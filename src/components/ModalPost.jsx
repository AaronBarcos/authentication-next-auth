import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Modal({ idPost, closeModal, getPosts }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOwn, setIsOwn] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session.user._id === post.author) {
      setIsOwn(true);
    } else {
      setIsOwn(false);
    }
  }, [session, post]);

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

  const deletePost = async () => {
    try {
      await axios.delete(`/api/posts/${idPost}`);
      getPosts();
      closeModal();
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
          {isOwn && (
            <button onClick={deletePost}>Delete this post</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Modal;
