import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function postComment({ content, headers, slug }) {
  console.log({content})
  try {
    const { data } = await axios({
      data: { comment: { content } },
      headers,
      method: "POST",
      url: `http://localhost:3001/api/posts/${slug}/comments`,
    });

    return data.comment;
  } catch (error) {
    errorHandler(error);
  }
}

export default postComment;
