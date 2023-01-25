import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import postComment from "../services/postComment";

// styles
import Avatar from "@mui/material/Avatar";
import {
  Grid,
  Button,
  Card,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import theme from "./CommentFormStyles";
import "./CommentForm.css";

function CommentForm({ updateComments }) {
  const [{ content }, setForm] = useState({ content: "" });
  const { headers, isAuth, loggedUser } = useAuth();
  const { username, profileimg } = loggedUser || {};
  const { slug } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim() === "") return;

    postComment({ content, headers, slug })
      .then(updateComments)
      .then(setForm({ content: "" }))
      .catch(console.error);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setForm({ content: e.target.value });
  };

  return isAuth ? (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ marginBottom: "10px" }}
      >
        <Card sx={{ width: "75%" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ p: "100px", borderWidth: "1px", padding: "10px" }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar src={profileimg} variant="rounded" alt="user-avatar" />
              <TextField
                multiline
                fullWidth
                minRows={1}
                id="outlined-multilined"
                placeholder="Write a comment"
                value={content}
                onChange={handleChange}
                sx={{
                  width: "500px",
                }}
              />
              <Button
                size="large"
                sx={{
                  bgcolor: "custom.moderateBlue",
                  color: "neutral.white",
                  p: "8px 25px",
                  "&:hover": {
                    bgcolor: "custom.lightGrayishBlue",
                  },
                }}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </ThemeProvider>
  ) : (
    <span className="center-text-unauth">
      <Link to="/login" style={{marginRight:"10px"}}>Sign in </Link> or <Link to="/register" style={{marginLeft: "10px", marginRight:"10px"}}> Sign up </Link>
      to add comments on this post.
    </span>
  );
}

export default CommentForm;
