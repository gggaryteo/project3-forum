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
      <div>
        <CommentForm updateComments={handleUpdates} />
        <CommentList triggerUpdate={comment} updateComments={handleUpdates} />
      </div>
    </div>
  );
}

export default CommentSection;
