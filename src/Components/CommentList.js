import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import dateFormatter from "../helpers/dateFormatter";
import deleteComment from "../services/deleteComment";
import getComments from "../services/getComments";
import CommentAuthor from "./CommentAuthor";

// styles
import './CommentList.css'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { Grid, Card} from "@mui/material";

function CommentList({ triggerUpdate, updateComments }) {
  const [comments, setComments] = useState([]);
  const { headers, isAuth, loggedUser } = useAuth();
  const { slug } = useParams();

  useEffect(() => {
    getComments({ slug }).then(setComments).catch(console.error);
  }, [slug, triggerUpdate]);

  const handleClick = (commentId) => {
    if (!isAuth) alert("You need to login first");

    const confirmation = window.confirm("Want to delete the comment?");
    if (!confirmation) return;

    deleteComment({ commentId, headers, slug })
      .then(updateComments)
      .catch(console.error);
  };

  return comments?.length > 0 ? (
    comments.map(({ author, author: { username }, content, createdAt, id }) => {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ marginBottom: "10px" }}
        >
          <Card sx={{ width: "75%" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 750,
                  bgcolor: "background.paper",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  margin: "10px 0",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <CommentAuthor {...author} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={content}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="grey"
                          fontSize="12px"
                        >
                          <p className="comment-date">{dateFormatter(createdAt)}</p>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                {isAuth && loggedUser.username === username && (
                  <button
                    className="trash-button"
                    onClick={() => handleClick(id)}
                  >
                    {" "}
                    <FaTrashAlt />{" "}
                  </button>
                )}
              </List>
            </Box>
          </Card>
        </Grid>
      );
    })
  ) : (
    <div>There are no comments yet...</div>
  );
}

export default CommentList;
