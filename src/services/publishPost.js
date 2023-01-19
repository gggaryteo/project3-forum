import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function setPost({
  content,
  description,
  headers,
  slug,
  tagList,
  title,
}) {
  try {
    const { data } = await axios({
      data: { post: { title, description, content, tagList } },
      headers,
      method: slug ? "PUT" : "POST",
      url: slug ? `http://localhost:3001/api/posts/${slug}` : "http://localhost:3001/api/posts",
    });

    return data.post.slug;
  } catch (error) {
    errorHandler(error);
  }
}

export default setPost;
