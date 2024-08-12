import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "../LikeBlock.module.css";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const LikeBlock = ({ postId }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    console.log("isLiked:", isLiked);
    console.log("numLikes:", numLikes);
  }, [isLiked, numLikes]);

  useEffect(() => {
    displayLikeBtn();
  }, [session]);

  const displayLikeBtn = async () => {
    const response = await fetch("/api/post/addLike", {
      method: "GET",
      headers: {
        postId: postId,
        userSession: session?.user.name,
      },
    });

    if (!response?.ok) throw new Error("Couldn't fetch posts!");

    const data = await response.json();
    setIsLiked(data.isPostLiked);
    setNumLikes(data.numLikes);
  };

  const handleLike = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/post/addLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          userSession: session?.user.name,
        }),
      });
      const data = await response.json();
      console.log("API response:", data.numLikes);
      if (response.ok) {
        setIsLiked((prevIsLiked) => !prevIsLiked); // Update state based on previous value
        setNumLikes(data.likes);
      } else {
        console.error("Error liking post:", data.message);
      }
    } catch (error) {
      console.log(error);
    }

    //setIsLiked(!isLiked);
  }

  const color = isLiked ? "violet" : "gray";

  return (
    <div className="flex items-center">
      <Button onClick={handleLike}>
        <FontAwesomeIcon
          icon={faHeart}
          className={`${styles.likeIcon} ${styles[`text-${color}`]} fa-2xl`}
        />
      </Button>

      <span className="ml-2">{numLikes}</span>
    </div>
  );
};

export default LikeBlock;