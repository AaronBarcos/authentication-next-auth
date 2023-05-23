import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function CreatePostForm({ showFormCreatePost, getPosts }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    console.log(file);
    
    try {
      formData.append("file", file);
      formData.append("upload_preset", "nextjsblog");
      const res = await axios.post("/api/upload/postImage", formData);
      setImage(res.data.image);
    }
    catch (error) {
      setErrorMessage(error.response.data.message);
    }

  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/posts/post", {
        title,
        image,
        content,
        author: session.user._id,
      });
      setErrorMessage("");
      setLoading(false);
      showFormCreatePost();
      getPosts();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" onChange={handleImageUpload} />
        {image && (
          <div>
            <h3>Image preview</h3>
            <img src={image} alt="Uploaded" />
          </div>
        )}
        <input
          type="text"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">{loading ? "Loading..." : "Post"}</button>
        <button onClick={showFormCreatePost}>Cancel</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default CreatePostForm;
