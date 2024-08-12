"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const tagOptions = [
  { value: "Foodie", label: "Foodie" },
  { value: "Travel", label: "Travel" },
  { value: "Love", label: "Love" },
  { value: "Funny", label: "Funny" },
  { value: "Wellness", label: "Wellness" },
  { value: "LucidDreaming", label: "LucidDreaming" },
  { value: "Nightmare", label: "Nightmare" },
  { value: "Surreal", label: "Surreal" },
  { value: "Daydreaming", label: "DayDreaming" },
];

export default function ClientCreatePost({
  isVisible,
  onClose,
  handleData,
  savePostToDB,
  data,
  selectedOptions,
  handleChange,
}) {
  // Don't show popup if set to not visible
  if (!isVisible) return null;

  // Makes sure form doesn't disapear when form is clicked
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="overflow-y-auto fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="max-h-screen w-8/12 flex flex-col">
        <Button
          isIconOnly
          color="danger"
          aria-label="Exit"
          className="place-self-end my-3"
          onClick={() => onClose()}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>

        <div className="bg-white p-2 rounded">
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Create a Dream Post!
            </h3>
            <form className="space-y-6">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                {/*Input for Title*/}
                <input
                  type="text"
                  id="base-input"
                  name="title"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data?.title || ""}
                  onChange={handleData}
                  required={true}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Dream description
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="10"
                  className="block p-2 resize-y w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Leave a comment..."
                  value={data?.message || ""}
                  onChange={handleData}
                  required={true}
                ></textarea>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="tags"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tags
                </label>
                <CreatableSelect
                  name="tags"
                  options={tagOptions}
                  value={selectedOptions}
                  onChange={handleChange}
                  isMulti={true}
                  placeholder="Add tags to your post..."
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={savePostToDB}
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
