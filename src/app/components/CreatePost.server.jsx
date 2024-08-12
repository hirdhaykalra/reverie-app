import ClientCreatePost from "./CreatePost.client";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";

export default function CreatePost({ isVisible, onClose }) {
  const { data: session } = useSession();
  const [data, setData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showPost, setShowPost] = useState(isVisible);

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const savePostToDB = async (event) => {
    event.preventDefault();

    const tagsString = selectedOptions.map((option) => option.value).join(",");

    try {
      const response = await fetch("../api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tags: tagsString,
          likes: [],
          username: session.user.name,
          mood: 2,
        }),
      });
      if (response.ok) {
        setData({
          title: "",
          message: "",
          tags: null,
          likes: "",
          username: "",
          mood: "",
        });
        setSelectedOptions([]);
        setShowPost(!showPost);
        onClose();
      } else {
        console.log("data not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Render server-side parts */}
      <ClientCreatePost
        isVisible={isVisible}
        onClose={onClose}
        handleData={handleData}
        savePostToDB={savePostToDB}
        data={data}
        selectedOptions={selectedOptions}
        handleChange={handleChange}
      />
    </>
  );
}
