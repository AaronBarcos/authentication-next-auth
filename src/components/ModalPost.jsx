import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import crypto from "crypto";
import { set } from "lodash";

function Modal({ idPost, closeModal }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOwn, setIsOwn] = useState(false);
  const { data: session } = useSession();
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

  const getPublicIdFromUrl = (url) => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

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

  const deletePost = async (urlCloudinary) => {
    setLoading(true);
    const publicId = getPublicIdFromUrl(urlCloudinary);

    const timestamp = new Date().getTime();
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_SECRET;
    console.log(apiSecret);
    console.log(apiKey);
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {
      await axios.delete(`/api/posts/${idPost}`);
      await axios.post(url, {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      });
      closeModal();
      setLoading(false);
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
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "50px", height: "auto" }}
          />
          <p>{post.content}</p>
          <button onClick={() => closeModal()}>Close</button>
          {isOwn && (
            <button onClick={() => deletePost(post.image)}>
              Delete this post
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Modal;
