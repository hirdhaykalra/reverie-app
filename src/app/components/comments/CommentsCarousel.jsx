import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Comment from "./Comment";

const CommentsCarousel = ({postContent}) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);
  
  const fetchComments = async () => {
    try {
      const response = await fetch("../../api/comment/by-post", { //current route
        method: "GET",
        headers: {
          postId: postContent._id,
        },
      });
      if (!response.ok) throw new Error("Couldn't fetch posts!");
      
      const commentData = await response.json();

      setComments(commentData.Comments);
    }
    catch (error) { console.log(error); }
  };
  //CAROUSEL HERE
  return (
    <div className="max-h-[220px] px-7 py-1 overflow-y-auto">
      {
        comments.map((comment) => (
          <span key={comment._id}>
            <Comment
            username={comment.username}
            message={comment.message}
            />
          </span>
          
        ))
      }
    </div>
  );

};

export default CommentsCarousel;
