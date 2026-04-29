import { useState } from "react";

export default function InstagramPost({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const addComment = () => {
    if (commentInput.trim() !== "") {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "20px auto", border: "1px solid #ddd", fontFamily: "sans-serif", background: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <strong>{post.username}</strong>
      </div>

      {/* Image */}
      <img src={post.image} style={{ width: "100%" }} />

      {/* Actions */}
     <div className="actions">
  <span style={{ cursor: "pointer", color: liked ? "red" : "black" }} onClick={handleLike}>❤️</span>
  <span style={{ cursor: "pointer" }} onClick={() => setShowComments(!showComments)}>💬</span>
</div>

      {/* Likes */}
      <div style={{ padding: "0 10px" }}><strong>{likes} likes</strong></div>

      {/* Caption */}
      <div style={{ padding: "10px" }}><strong>{post.username}</strong> {post.caption}</div>

      {/* Comments */}
      {showComments && (
        <div style={{ padding: "10px" }}>
          {comments.map((c, i) => (
            <p key={i} style={{ margin: "5px 0" }}>
              <strong>User{i + 1}</strong> {c}
            </p>
          ))}
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <button onClick={addComment} style={{ padding: "8px 15px", cursor: "pointer" }}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
