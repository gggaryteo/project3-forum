import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getProfile({ headers, username }) {
  try {
    const { data } = await axios({ headers, url: `http://localhost:3001/api/profiles/${username}` });

    return data.profile;
  } catch (error) {
    errorHandler(error);
  }
}

export default getProfile;
