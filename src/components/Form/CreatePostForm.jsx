import { useState } from "react"
import axios from "axios"

function CreatePostForm( { showFormCreatePost, getPosts } ) {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const handleCreatePost = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post("/api/posts/post", {
                title,
                image,
                content
            })
            setErrorMessage("");
            setLoading(false);
            showFormCreatePost();
            getPosts();
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setLoading(false);
        }
    }


  return (

    <div>
        <form onSubmit={handleCreatePost}>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value) } />
            <input type="text" placeholder="Image" onChange={(e) => setImage(e.target.value)} />
            <input type="text" placeholder="Content" onChange={(e) => setContent(e.target.value)} />
            <button type="submit">
                {loading ? "Loading..." : "Post"}
            </button>
            <button onClick={showFormCreatePost}>Cancel</button>
            {errorMessage && <p>{errorMessage}</p>}

        </form>

    </div>
  )
}

export default CreatePostForm