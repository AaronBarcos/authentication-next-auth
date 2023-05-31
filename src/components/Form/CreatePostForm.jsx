import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function CreatePostForm({ showFormCreatePost }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        `${process.env.CLOUDINARY_UPLOAD_PRESET}`
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      await axios.post("/api/posts/post", {
        title,
        image: response.data.secure_url,
        content,
        author: session.user._id,
      });

      setLoading(false);
      showFormCreatePost();
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
        <input
          type="file"
          placeholder="Image"
          onChange={(e) => setImage(e.target.files[0])}
        />
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
