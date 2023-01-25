import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function updateUser({ headers, biography, email, profileimg, password, username }) {
  try {
    const { data } = await axios({
      data: { user: { biography, email, profileimg, password, username } },
      headers,
      method: "PUT",
      url: "http://localhost:3001/api/user",
    });

    const { user } = data;

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error) {
    errorHandler(error);
  }
}

export default updateUser;
