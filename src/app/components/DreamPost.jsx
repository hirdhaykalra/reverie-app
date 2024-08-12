import PostPicture from "./PostPicture";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LikeBlock from "./LikeBlock";

const DreamPost = ({ title, message, tags, username, _id }) => {
  const { data: session } = useSession();

  const handleDelete = async (event) => {
    event.preventDefault();

    if (session.user.name === username) {
      try {
        const confirm = window.confirm("Are you sure?");
        if (confirm) {
          const res = await fetch(`../api/post/delete/${_id}`, {
            method: "DELETE",
          });
          if (res.status === 201) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-slate-200 max-h-full">
      <PostPicture />

      <div className="px-6 py-4 max-h-64 min-h-40 overflow-hidden">
        <div className="font-bold text-xl mb-2">{title || "Untitled Post"}</div>
        {message && <p className="text-gray-700 text-base">{message}</p>}
      </div>

      {tags && tags.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-violet-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className=" px-6 pt-4 pb-2 flex flex-row justify-between">
        <LikeBlock postId={_id.toString()} />
        
        {session && session.user.name === username && (
          <div className="">

            <Button
              isIconOnly
              aria-label="Like"
              color="danger"
              variant="solid"
              size="md"
              onClick={handleDelete}
              className="text-white text-md place-self-end"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default DreamPost;
