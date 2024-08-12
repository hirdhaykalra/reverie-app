import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Comment = ({ username, message }) => {
  return (
    <div className="border-solid border-2 top-2 py-2">
      <b><u>{ username }:</u></b> 
      <a> { message }</a>
    </div>
  )
}

export default Comment;