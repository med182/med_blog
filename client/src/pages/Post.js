import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:8000/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:8000/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            id: response.data.id,
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    if (!commentId) {
      console.error("Comment ID is undefined.");
      return;
    }
    axios
      .delete(`http://localhost:8000/comments/${commentId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== commentId;
          })
        );
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8000/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPost = (option) => {
    let newValue;
    if (option === "title") {
      newValue = window.prompt("Enter New Title: ");
    } else {
      newValue = prompt("Enter New Text: ");
    }

    if (newValue !== null) {
      axios.put(
        option === "title"
          ? "http://localhost:8000/posts/title"
          : "http://localhost:8000/posts/postText",
        {
          newTitle: option === "title" ? newValue : postObject.title,
          newText: option === "body" ? newValue : postObject.postText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({
        ...postObject,
        title: option === "title" ? newValue : postObject.title,
        postText: option === "body" ? newValue : postObject.postText,
      });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              editPost("title");
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              editPost("body");
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                Supprimer Le Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Commentaire..."
            autoComplete="off"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment}>Ajouter un commentaire</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label>Pseudo: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Post;
