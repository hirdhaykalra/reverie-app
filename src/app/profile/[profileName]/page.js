"use client";

import { Fragment, useState, useEffect } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import DreamPost from "../../components/DreamPost";
import { useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/react";

const ProfileDetails = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const { data: session } = useSession();
  const [showFollowButton, setShowFollowButton] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchPosts();
    displayFollowButton();
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/post/by-user`, {
        method: "GET",
        headers: {
          profileName: params.profileName,
        },
      });

      if (!response.ok) throw new Error("Couldn't fetch posts!");

      const data = await response.json();

      setPosts(data.posts);
      setPostCount(data.postCount);
      setFollowerCount(data.followerCount);
      setFollowingCount(data.followingCount);
    } catch (error) {
      console.log(error);
    }
  };

  const displayFollowButton = async () => {
    if (session && session.user.name === params.profileName) {
      setShowFollowButton(false);
    } else {
      setShowFollowButton(true);
    }

    const response = await fetch("/api/user/addFollower", {
      method: "GET",
      headers: {
        profileName: params.profileName,
        userSession: session?.user.name,
      },
    });
    
    if (!response?.ok) throw new Error("Couldn't fetch posts!");

    const data = await response.json();
    setIsFollowing(data.isFollowing);
  };

  const handleFollow = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/user/addFollower", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileName: params.profileName,
          followerName: session?.user.name,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setIsFollowing(!isFollowing);
  };

  return (
    <Fragment>
      <Header />
      <main className="content-center flex min-h-screen flex-col py-8">
        <div className="grid grid-cols-5 grid-flow-auto p-2">
          <div className="col-start-1 col-span-2 row-span-1 justify-self-center">
            <div className="sticky inset-y-1/3">
              <Avatar
                isBordered
                color="secondary"
                src="/static/defaultProfilePic.png"
                className="w-[200px] h-[200px] text-large mx-auto my-3"
              ></Avatar>
              <h1 className="text-center">{params.profileName} </h1>
              <div className="grid grid-cols-3 grid-rows-2 gap-x-5 text-center">
                <div className="col-start-1 row-start-1">
                  <span className="font-bold text-lg">{postCount}</span>
                </div>
                <div className="col-start-2 row-start-1">
                  <span className="font-bold text-lg">{followerCount}</span>
                </div>
                <div className="col-start-3 row-start-1">
                  <span className="font-bold text-lg">{followingCount}</span>
                </div>
                <div className="col-start-1 row-start-2">
                  <span className="text-gray-600">Posts</span>
                </div>
                <div className="col-start-2 row-start-2">
                  <span className="text-gray-600">Followers</span>
                </div>
                <div className="col-start-3 row-start-2">
                  <span className="text-gray-600">Following</span>
                </div>
                <div className="col-start-2 row-start-3">
                  {showFollowButton && (
                    <button
                      onClick={handleFollow}
                      className={`inline-block ${
                        isFollowing ? "bg-red-500" : "bg-green-500"
                      } ${
                        isFollowing ? "hover:bg-red-700" : "hover:bg-green-700"
                      } text-white font-bold py-2 px-4 rounded`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-start-3 col-end-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-subgrid gap-4">
              {posts.map((post) => (
                <div className="col-span-1" key={post._id.toString()}>
                  <DreamPost
                    key={post._id.toString()}
                    title={post.title}
                    message={post.message}
                    tags={post.tags}
                    username={post.username}
                    _id={post._id.toString()}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ProfileDetails;
