import axios from "axios";
import errorHandler from "../helpers/errorHandler";

// input author_id (user_id from post)
// retrieve author username
// return author username

export default async function getUsername(author_id) {
  try {
    const userAvatar = await axios.get(
      `http://localhost:3001/api/users/${author_id}`
    );
    return userAvatar;
  } catch (err) {
    console.log(err);
  }
}
