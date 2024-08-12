import ClientSinglePostModal from "./SinglePostModal.client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";


export default function SinglePostModal({ isVisible, onClose, postContent }) {
    const [data, setData] = useState({});
    const { data: session } = useSession();


    const handleData = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const saveCommentToDB = async (event) => {
        event.preventDefault();
        console.log("HERE");


        try {
            const response = await fetch("../api/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId: postContent._id, ...data, username: session.user.name})
            });
            if (response.ok) {
                setData({ message: ""});
            }
            else { console.log("data not sent"); }
        }
        catch (error) { console.log(error); }
    }

    return (
        <>
            {/* Render server-side parts */}
            <ClientSinglePostModal
                isVisible={isVisible}
                onClose={onClose}
                handleData={handleData}
                saveCommentToDB={saveCommentToDB}
                data={data}
                postContent={postContent}
                //getComments={getComments}
            />
        </>
    );
}