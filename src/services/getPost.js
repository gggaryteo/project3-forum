import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getPost({ headers, slug }) {
  try {
    const { data } = await axios({ headers, url: `http://localhost:3001/api/posts/${slug}` });

    return data.post;
  } catch (error) {
    errorHandler(error);
  }
}

export default getPost;
