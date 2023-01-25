import { useState } from "react";
import CommentForm from "../../Components/CommentForm";
import CommentList from "../../Components/CommentList";

function CommentSection() {
  const [comment, setComment] = useState({});

  const handleUpdates = (e) => {
    setComment(e);
  };

  return (
    <div>
      <>
        <CommentForm updateComments={handleUpdates} />
      </>
      <h2 style={{ textAlign: "center" }}> Comments: </h2>
      <CommentList triggerUpdate={comment} updateComments={handleUpdates} />
    </div>
  );
}

export default CommentSection;
