// AdminPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch users, comments, and posts from the server
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:8000/admin/users"
        );
        const commentsResponse = await axios.get(
          "http://localhost:8000/admin/comments"
        );
        const postsResponse = await axios.get(
          "http://localhost:8000/admin/posts"
        );

        setUsers(usersResponse.data);
        setComments(commentsResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/delete-user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8000/admin/delete-comment/${commentId}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/delete-post/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h2>Utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} -{" "}
            <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h2>Commentaires à modérer</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.commentBody} -{" "}
            <button onClick={() => handleDeleteComment(comment.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <h2>Posts à modérer</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.commentBody} -{" "}
            <button onClick={() => handleDeletePost(post.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
