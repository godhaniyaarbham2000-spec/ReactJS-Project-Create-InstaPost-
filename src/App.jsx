import { useState } from "react";
import InstagramPost from "./components/InstagramPost";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  // Dummy login
  const handleLogin = () => {
    if (username.trim() !== "") setLoggedIn(true);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Add new post
  const handlePost = () => {
    if (image) {
      const newPost = {
        id: Date.now(),
        username,
        image,
        caption,
        likes: 0,
        liked: false,
        comments: []
      };
      setPosts([newPost, ...posts]); // latest first
      setImage(null);
      setCaption("");
      document.getElementById("imageInput").value = "";
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", width: "80%", marginBottom: "10px" }}
        />
        <br />
        <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="container" style={{ textAlign: "center" }}>Welcome, {username}!</h2>

      {/* New Post Form */}
      <div  className="card create-post" style={{ maxWidth: "500px", margin: "20px auto", padding: "10px", border: "1px solid #ccc" }}>
        <h3>Create Post</h3>
        <input type="file" accept="image/*" onChange={handleImageChange} id="imageInput" />
        <br />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <button onClick={handlePost} style={{ padding: "8px 15px", cursor: "pointer" }}>Post</button>
        {image && <img src={image} alt="preview" style={{ width: "100%", marginTop: "10px" }} />}
      </div>

      {/* Feed */}
      <div>
        {posts.map((post) => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
