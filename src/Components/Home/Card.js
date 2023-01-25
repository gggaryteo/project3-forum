import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { red, yellow } from "@mui/material/colors";
import { auto } from "@popperjs/core";
import { useAuth } from "../../context/AuthContext";
import getUsername from "../../services/getUsername";

export default function CardPost(props) {
  const [likeColor, setLikeColor] = useState("");
  const [favColor, setFavColor] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const { isAuth, headers, loggedUser } = useAuth();
  const [currentUser, setUserInfo] = useState({});

  // console.log(headers);
  // console.log("Current user: ", loggedUser);
  const date = props.date;
  const stringDate = date.toString();

  useEffect(() => {
    // const likePost = async () => {
    //   const user_email = loggedUser.email;
    //   console.log(user_email);

    //   // get current user email -> retrieve user_id
    //   // retrieve post_id
    //   // post post_id + like counter
    //   // update users_likes
    // };
    // likePost();

    // To set default post profile avatar [username or img]
    getUsername(props.author).then((result) => {
      setAuthor(result.data.username);
      if (result.data.userimg === null) {
        setAuthorImg(" ");
      } else {
        setAuthorImg(result.data.userimg);
      }
    });
  }, []);

  const handleFavorite = (e) => {
    if (favColor === "") {
      setFavColor(red[900]);
    } else {
      setFavColor("");
    }
  };

  const handleLike = (e) => {
    if (likeColor === "") {
      setLikeColor(yellow[900]);
    } else {
      setLikeColor("");
    }
  };

  return (
    <Card
      sx={{
        width: 650,
        height: 300,
        margin: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} alt={author} src={authorImg} />
        }
        title={props.title}
        subheader={stringDate}
      />

      <CardContent
        sx={{
          width: 600,
          height: 150,
          margin: auto,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          sx={{
            left: "90%",
            color: `${likeColor}`,
          }}
          onClick={isAuth ? handleLike : null}
        >
          <ThumbUpIcon />
        </IconButton>

        <IconButton
          sx={{
            left: "75%",
            color: `${favColor}`,
          }}
          onClick={isAuth ? handleFavorite : null}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
