import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import getPost from "../services/getPost";
import publishPost from "../services/publishPost";
import "./CreatePostForm.css"

const emptyForm = { title: "", description: "", content: "", tagList: "" };

function CreatePostForm() {
  const { state } = useLocation();
  const [{ title, description, content, tagList }, setForm] = useState(
    state || emptyForm
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuth, headers, loggedUser } = useAuth();

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const redirect = () => navigate("/", { replace: true, state: null });
    if (!isAuth) return redirect();

    if (state || !slug) return;

    getPost({ headers, slug })
      .then(({ author: { username }, content, description, tagList, title }) => {
        if (username !== loggedUser.username) redirect();

        setForm({ content, description, tagList, title });
      })
      .catch(console.error);

    return () => setForm(emptyForm);
  }, [headers, isAuth, loggedUser.username, navigate, slug, state]);

  const inputHandler = (e) => {
    const type = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [type]: value }));
  };

  const tagsInputHandler = (e) => {
    const value = e.target.value;

    setForm((form) => ({ ...form, tagList: value.split(/,| /) }));
  };

  const formSubmit = (e) => {
    e.preventDefault();

    publishPost({ headers, slug, content, description, tagList, title })
      .then((slug) => navigate(`/post/${slug}`))
      .catch(setErrorMessage);
  };

  return (
    <form className="post-form" onSubmit={formSubmit}>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <h2>Create Post</h2>

      <label>
        <span>Title:</span>
        <input
          name="title"
          placeholder="Post Title"
          required
          value={title}
          onChange={inputHandler}
        />
      </label>

      <label>
        <span>Write Post Description:</span>
        <input
          name="description"
          required
          placeholder="What's this post about?"
          value={description}
          onChange={inputHandler}
        />
      </label>

      <label>
        <span>Write Content:</span>
        <textarea
          name="content"
          rows="8"
          required
          type="password"
          placeholder="Write your post here"
          value={content}
          onChange={inputHandler}
        ></textarea>
      </label>

      <label>
        <span>Enter tags:</span>
        <input
          placeholder="Enter tags"
          required
          name="tags"
          value={tagList}
          onChange={tagsInputHandler}
        />
      </label>

      <button className="btn">Publish Post</button>
    </form>
  );
}

export default CreatePostForm;