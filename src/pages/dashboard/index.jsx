import { useEffect, useState } from "react";
import axios from "axios";
import CreatePostForm from "../../components/Form/CreatePostForm";
import Modal from "@/components/ModalPost";

function dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idPost, setIdPost] = useState("");

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

  const handleModal = (idPost) => {
    setIdPost(idPost);

    setShowModal(true);
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
          <CreatePostForm
            showFormCreatePost={() => setShowForm(false)}
            getPosts={getPosts}
          />
        )}
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {posts.map((post) => (
            <button
              onClick={() => handleModal(post._id)}
              className="flex items-center"
              key={post._id}
            >
              <h2>{post.title}</h2>
              <img src={post.image} alt={post.title} />
              <p>{post.content}</p>
              {/* <p>{post.createdAt}</p> */}
            </button>
          ))}
        </div>
        {showModal && (
          <div>
            <Modal
              idPost={idPost}
              getPosts={getPosts}
              closeModal={() => setShowModal(false)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default dashboard;
