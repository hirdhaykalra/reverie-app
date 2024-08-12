"use client";

import { Fragment, useState, useEffect } from "react";
import Header from "../components/Header";
import DreamPost from "../components/DreamPost";
import CreatePost from "../components/CreatePost.server";
// import CreatePost from "../components/CreatePost.server";
import SinglePostModal from "../components/SinglePostModal.server";
import { Button } from "@nextui-org/react";

export default function Dream() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showSinglePost, setShowSinglePost] = useState(false);
  const [singlePost, setSinglePost] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("../api/post/");
      if (!response.ok) throw new Error("Couldn't fetch posts!");

      const data = await response.json();

      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <main className="flex min-h-screen flex-col py-1">
        <div className="p-8 grid grid-cols-4 gap-4">
          <Button
            color="secondary"
            id="addPostButton"
            variant="shadow"
            className="fixed bottom-10 right-20 z-50 text-xl"
            onClick={() => {
              setShowPostForm(true);
              // Disables Background Scrolling while the Modal is open
              if (typeof window != "undefined" && window.document) {
                document.body.style.overflow = "hidden";
              }
              document.getElementById("addPostButton").style.display = "none";
            }}
          >
            Add Post
          </Button>

          {posts.map((post) => (
            <a
              key={post._id}
              onClick={() => {
                setShowSinglePost(true);
                setSinglePost(post);
                
                // Disables Background Scrolling while the Modal is open
                if (typeof window != "undefined" && window.document) {
                  document.body.style.overflow = "hidden";
                }
                document.getElementById("addPostButton").style.display = "none";
              }}
            >
              <DreamPost
                key={post._id}
                title={post.title}
                message={post.message}
                tags={post.tags}
                username={post.username}
                _id={post._id.toString()}
              />
            </a>
          ))}
        </div>
        <SinglePostModal
          isVisible={showSinglePost}
          onClose={() => {
            setShowSinglePost(false);
            // Unsets Background Scrolling to use when Modal is closed
            document.body.style.overflow = "unset";
            document.getElementById("addPostButton").style.display = "block";
          }}
          postContent={singlePost}
        />
        <CreatePost
          isVisible={showPostForm}
          onClose={() => {
            setShowPostForm(false);
            // Unsets Background Scrolling to use when Modal is closed
            document.body.style.overflow = "unset";
            document.getElementById("addPostButton").style.display = "block";
            fetchPosts();
          }}
        />
      </main>
    </Fragment>
  );
}
