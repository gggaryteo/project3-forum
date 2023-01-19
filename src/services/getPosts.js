import axios from "axios";
import errorHandler from "../helpers/errorHandler";

// prettier-ignore
async function getPosts({ headers, limit = 3, location, page = 0, tagName, username }) {
  try {
    const url = {
      favorites: `http://localhost:3001/api/posts?favorited=${username}&&limit=${limit}&&offset=${page}`,
      feed: `http://localhost:3001/api/posts/feed?limit=${limit}&&offset=${page}`,
      global: `http://localhost:3001/api/posts?limit=${limit}&&offset=${page}`,
      profile: `http://localhost:3001/api/posts?author=${username}&&limit=${limit}&&offset=${page}`,
      tag: `http://localhost:3001/api/posts?tag=${tagName}&&limit=${limit}&&offset=${page}`,
    };

    const { data } = await axios({ url: url[location], headers });

    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default getPosts;
