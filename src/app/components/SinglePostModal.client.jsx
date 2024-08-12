"use client";
import React, { useState } from "react";
import CommentsCarousel from "./comments/CommentsCarousel";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import LikeBlock from "./LikeBlock";
import { useSession } from "next-auth/react";
export default function ClientSinglePostModal({
  isVisible,
  onClose,
  postContent,
  data,
  handleData,
  saveCommentToDB,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-8/12 flex flex-col">
        <Button
          isIconOnly
          color="danger"
          aria-label="Exit"
          className="place-self-end my-3"
          onClick={() => onClose()}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
        <div className="bg-white relative w-full h-[700px] max-h-full rounded">
          <div className="grid">
            <div className="h-[100px] bg-gradient-to-br from-violet-400 to-purple-200">
              <div
                className="cursor-pointer bg-black text-white p-2 rounded-full h-40 w-40 absolute -top-20 -left-20 content-evenly border-slate-indigo"
                onClick={() => {
                  router.push(`../profile/${postContent.username}`);
                }}
              >
                <p className="text-white text-xl text-center">
                  {postContent.username}
                </p>
              </div>
              <div className=" font-bold text-2xl absolute left-20 mx-5 my-5">
                {postContent.title}
              </div>
            </div>
            <div className="mx-10 py-1">
              {postContent.tags && postContent.tags.length > 0 && (
                <div className="px-6 pt-4">
                  {postContent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-purple-100 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="overflow-y-auto min-h-[150px] max-h-[250px] mx-16 px-5">
              <p className=" text-lg">{postContent.message}</p>
            </div>

            <div className="bg-purple-100">
              <form>
                <div className="flex items-center px-3 py-2 rounded-lg dark:bg-gray-700">
                  <textarea
                    rows="1"
                    className="resize-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="message"
                    name="message"
                    placeholder="Leave a comment..."
                    value={data?.message}
                    onChange={handleData}
                    required={true}
                  ></textarea>
                  <button
                    type="submit"
                    onClick={saveCommentToDB}
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5 rotate-90 rtl:-rotate-90"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                  </button>
                </div>
              </form>
              <div className="bg-gray-100"> <CommentsCarousel postContent={postContent} /> </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// key={post._id}
//                 title={post.title}
//                 message={post.message}
//                 tags={post.tags}
//                 username={post.username}
//                 _id={post._id.toString()}

{
  /* <div className="mx-[50px] w-2/3">
                  <Textarea
                    variant="bordered"
                    id="message"
                    name="message"
                    rows="1"
                    placeholder="Leave a comment..."
                    value={data?.message}
                    onChange={handleData}
                    required={true}
                    className=""
                  ></Textarea>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={saveCommentToDB}
                >
                  Comment
                </button> */
}
